import {
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getRickAndMortyResource<T>(
  httpService: HttpService,
  pathOrUrl: string,
): Promise<T> {
  const url = pathOrUrl.startsWith('http')
    ? pathOrUrl
    : `${API_BASE_URL}${pathOrUrl}`;

  try {
    const response = await firstValueFrom(httpService.get<T>(url));
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 404) {
      throw new NotFoundException(
        'El recurso solicitado no existe en la API de Rick and Morty.',
      );
    }

    throw new BadGatewayException(
      'No fue posible consultar la API de Rick and Morty.',
    );
  }
}
