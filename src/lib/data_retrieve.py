import requests
import json
from geopy.distance import geodesic

# Replace with your own Google Maps API Key
API_KEY = "AIzaSyDLWDYHCrAMeyf4awfFIbdq1mIxbF7AenI"

def calculate_distance(origin, destination):
    """
    Calculate the distance between two geographic coordinates using the geodesic formula.

    Parameters:
    - origin (tuple): The (latitude, longitude) of the origin point.
    - destination (tuple): The (latitude, longitude) of the destination point.

    Returns:
    - float: The distance in miles between the two points.
    """
    return geodesic(origin, destination).miles

def get_place_details(api_key, place_id):
    """
    Get details of a place using the Google Places API.

    Parameters:
    - api_key (str): Your Google Maps API Key.
    - place_id (str): The unique identifier for the place.

    Returns:
    - dict: Details of the place obtained from the API.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        'key': api_key,
        'place_id': place_id,
    }

    response = requests.get(base_url, params=params)
    result = response.json().get('result', {})

    return result

def get_nearby_places(api_key, location, radius, types):
    """
    Get a list of nearby places based on the specified criteria.

    Parameters:
    - api_key (str): Your Google Maps API Key.
    - location (str): The geographic coordinates (latitude, longitude) around which to search for places.
    - radius (int): The radius in meters around the location to consider for place search.
    - types (str): The type or category of places to search for.

    Returns:
    - list: A list of places that match the specified criteria.
    """
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'key': api_key,
        'location': location,
        'radius': radius,
        'types': types
    }

    response = requests.get(base_url, params=params)
    results = response.json().get('results', [])

    return results

def main():
    # Configuration
    api_key = API_KEY
    gmu_location = (38.8318, -77.3122)
    radius = 80000

    # Define categories and their corresponding Google Places API types
    categories = {
        'Museums': 'museum',
        'Art Galleries': 'art_gallery',
        'Historical Landmarks': 'point_of_interest',
        'Monuments': 'monument',
        'Restaurants': 'restaurant',

        'Theaters': 'movie_theater',
        'Cinemas': 'movie_theater',
        'Music Venues': 'night_club',
        'Comedy Clubs': 'night_club',
        'Nightclubs': 'night_club',

        'Parks and Botanical Gardens': 'park',
        'Zoos and Wildlife Sanctuaries': 'zoo',
        'Outdoor Festivals and Events': 'point_of_interest',
        'Hiking and Biking Trails': 'park',

        'Malls and Shopping Centers': 'shopping_mall',
        'Street Markets': 'shopping_mall',
        'Boutique Shops': 'clothing_store',
        'Antique Markets': 'store',

        'Stadiums': 'stadium',
        'Arenas': 'stadium',
        'Sports Bars': 'bar',
        'Recreation Centers': 'gym',

        'Fine Dining Restaurants': 'restaurant',
        'Casual Eateries': 'restaurant',
        'Food Markets': 'food',
        'Trendy Cafes': 'cafe',

        'Theme Parks': 'amusement_park',
        'Water Parks': 'amusement_park',
        'Arcades and Gaming Centers': 'amusement_park',

        'Concert Halls': 'point_of_interest',
        'Live Music Venues': 'point_of_interest',
        'Festivals and Music Events': 'point_of_interest',

        'Science Museums': 'museum',
        'Planetariums': 'museum',
        'Educational Workshops and Lectures': 'point_of_interest',

        'Parades': 'point_of_interest',
        'Street Fairs': 'point_of_interest',
        'Cultural Festivals': 'point_of_interest',
        'Farmers\' Markets': 'point_of_interest',

        'Public Libraries': 'library',
    }

    all_places = []

    # Iterate through each category and retrieve nearby places
    for category, place_type in categories.items():
        places = get_nearby_places(api_key, f'{gmu_location[0]},{gmu_location[1]}', radius, place_type)
        category_places = []

        # Process each place in the category
        for place in places:
            place_location = (place['geometry']['location']['lat'], place['geometry']['location']['lng'])
            distance = calculate_distance(gmu_location, place_location)

            # Create a dictionary with place information
            place_data = {
                'name': place['name'],
                'address': place.get('vicinity', ''),
                'distance': distance,
                'category': category,
                'place_id': place['place_id']
            }

            # Retrieve additional details for the place
            details = get_place_details(api_key, place['place_id'])
            place_data['wheelchair_accessible'] = details.get('accessibility', {}).get('wheelchair_accessible', False)
            place_data['url'] = details.get('url', '')

            # Add the place data to the list
            category_places.append(place_data)

        # Add all places in the category to the overall list
        all_places.extend(category_places)

    # Output data to a JSON file
    with open('place_data.json', 'w') as json_file:
        json.dump(all_places, json_file, indent=2)

if __name__ == "__main__":
    main()
