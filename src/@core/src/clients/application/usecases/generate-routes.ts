import {
  ClientCoordinate,
  ClientsCoordinatesRepository,
} from '#clients/domain';
import { IClientOutput } from '../dto';

export class Usecase {
  constructor(
    private readonly clientsCoordinatesRepository: ClientsCoordinatesRepository.Repository,
  ) {}

  /**
   * This method search for all clients. Then creates a
   * custom client coordinate (0,0) to mark start point,
   * then using greedy algorithm choose the best city for current city
   * visiting. After all cities visited, returns to starting point.
   * This approach always returns the best path for each current city visiting,
   * not necessarily the best optimal solution.
   * @author Nash Junior
   *
   * @returns sorted list of clients to visit excluded the start point
   */
  async execute(): Promise<IClientOutput[]> {
    const clientsCoordinates = await this.clientsCoordinatesRepository.find();

    const startingPoint = await ClientCoordinate.create(undefined as any, {
      latitude: (0).toString(),
      longitude: (0).toString(),
    });

    const unvisitedCities = [...clientsCoordinates];
    const optimalPath: ClientCoordinate[] = [startingPoint];

    let currentCity = startingPoint;

    while (unvisitedCities.length > 0) {
      const nearestCity = this.findNearestClient(currentCity, unvisitedCities);
      optimalPath.push(nearestCity);
      currentCity = nearestCity;
    }

    return optimalPath
      .slice(1) // Exclude starting point
      .map(clientCoordinate => clientCoordinate.client.toJSON());
  }

  /**
   *  Finds the closest client of currenct client
   * @param currentCity current city visting
   * @param unvisitedCities list of unvisited cities
   * @returns the next client ccordinate to visit
   */
  private findNearestClient(
    currentCity: ClientCoordinate,
    unvisitedCities: ClientCoordinate[],
  ): ClientCoordinate {
    let nearestCity = unvisitedCities[0];
    let shortestDistance = this.calculateDistance(currentCity, nearestCity);

    for (let i = 1; i < unvisitedCities.length; i++) {
      const distance = this.calculateDistance(currentCity, unvisitedCities[i]);
      if (distance < shortestDistance) {
        nearestCity = unvisitedCities[i];
        shortestDistance = distance;
      }
    }

    const index = unvisitedCities.indexOf(nearestCity);
    unvisitedCities.splice(index, 1); // Remove from unvisited cities lists
    return nearestCity;
  }

  /**
   * Euclidian Function that returns the distance between two points
   * @param coord1 current client visiting
   * @param coord2 next optimal client coordinate to visit
   * */
  private calculateDistance(
    coord1: ClientCoordinate,
    coord2: ClientCoordinate,
  ): number {
    const dx = parseFloat(coord1.latitude) - parseFloat(coord2.latitude);
    const dy = parseFloat(coord1.longitude) - parseFloat(coord2.longitude);
    return Math.sqrt(dx * dx + dy * dy);
  }
}
