import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import axios from 'axios';

import carIcon from '~/assets/icons/car.svg'; 


interface Technician {
  id: string;
  name: string;
  lat: number;
  lon: number;
  phone?: string;
}

const TechniciansMapPage = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([55.751244, 37.618423]); // Москва

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setUserLocation([coords.latitude, coords.longitude]),
        (error) => console.error("Ошибка геолокации:", error)
      );
    }
  }, []);

  useEffect(() => {
    const fetchTechnicians = () => {
      axios.get('https://backend.wmf24.ru/api/technicians')
        .then(res => setTechnicians(res.data))
        .catch(err => console.error('Ошибка обновления данных:', err));
    };
  
    fetchTechnicians(); 
  
    const interval = setInterval(fetchTechnicians, 10000);
  
    return () => clearInterval(interval); 
  }, []);

  const mapStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  };

  return (
    <div className="page page-map">
      <YMaps>
        <Map state={{ center: userLocation, zoom: 11 }} style={mapStyle}>
          <GeolocationControl options={{ float: 'right' }} />
          {technicians.map(tech => (
            <Placemark
              key={tech.id}
              geometry={[tech.lat, tech.lon]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: carIcon,
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -15],
              }}
              properties={{
                hintContent: tech.name,
                balloonContentHeader: tech.name,
                balloonContentBody: tech.phone ?? '',
              }}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default TechniciansMapPage;
