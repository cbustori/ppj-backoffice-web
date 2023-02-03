import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

export interface GooglePlace {
    placeId: string;
    name: string;
    vicinity?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    icon?: string;
    formattedAddress?: string;
    geometry?: number[];
    phoneNumber?: string;
    priceLevel?: number;
    photos?: {
        photoReference: string;
        height: number;
        width: number;
        htmlAttributions: string[];
    }[];
    website?: string;
}

@Injectable({ providedIn: 'root' })
export class PlaceSearchService {
    private searchPlacesQuery = gql`
        query($search: String!) {
            searchPlaces(search: $search) {
                placeId
                name
            }
        }
    `;

    private placeDetailsQuery = gql`
        query($placeId: String!) {
            placeDetails(placeId: $placeId) {
                placeId
                name
                icon
                vicinity
                postalCode
                city
                country
                formattedAddress
                phoneNumber
                geometry
                website
            }
        }
    `;

    constructor(private apollo: Apollo) {}

    searchPlaces(searchText: string): Observable<GooglePlace[]> {
        return this.apollo
            .query<any>({
                query: this.searchPlacesQuery,
                variables: {
                    search: searchText,
                },
            })
            .pipe(map(({ data }) => data.searchPlaces));
    }

    placeDetails(placeId: string): Observable<GooglePlace> {
        return this.apollo
            .query<any>({
                query: this.placeDetailsQuery,
                variables: {
                    placeId: placeId,
                },
            })
            .pipe(map(({ data }) => data.placeDetails));
    }
}
