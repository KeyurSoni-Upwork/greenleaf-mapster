
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

// Sample distribution center locations
const DISTRIBUTION_CENTERS = [
  { id: 1, name: "Denver HQ", lat: 39.7392, lng: -104.9903, address: "1234 Cannabis Ave, Denver, CO 80202" },
  { id: 2, name: "Portland Center", lat: 45.5152, lng: -122.6784, address: "5678 Green St, Portland, OR 97201" },
  { id: 3, name: "Los Angeles Hub", lat: 34.0522, lng: -118.2437, address: "9101 Marijuana Blvd, Los Angeles, CA 90001" },
  { id: 4, name: "Chicago Outlet", lat: 41.8781, lng: -87.6298, address: "1213 Hemp Road, Chicago, IL 60007" },
  { id: 5, name: "Boston Dispensary", lat: 42.3601, lng: -71.0589, address: "1415 Joint Circle, Boston, MA 02101" },
  { id: 6, name: "Seattle Store", lat: 47.6062, lng: -122.3321, address: "1617 Kush Way, Seattle, WA 98101" },
  { id: 7, name: "Miami Branch", lat: 25.7617, lng: -80.1918, address: "1819 Blunt Blvd, Miami, FL 33101" },
  { id: 8, name: "Las Vegas Outlet", lat: 36.1699, lng: -115.1398, address: "2021 Doobie Dr, Las Vegas, NV 89101" },
];

const LocationMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<typeof DISTRIBUTION_CENTERS[0] | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and load the Google Maps API
  useEffect(() => {
    // This is a function to load the Google Maps API script
    const loadGoogleMapsApi = () => {
      const googleMapsApiKey = ""; // Intentionally left blank - no API key required for basic map display
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    };

    // Initialize the map once the API is loaded
    const initializeMap = () => {
      if (!mapRef.current || window.google === undefined) return;
      
      setIsLoading(false);
      
      const mapOptions = {
        center: { lat: 39.8283, lng: -98.5795 }, // Center of the US
        zoom: 4,
        mapTypeId: 'hybrid', // Use satellite imagery with road labels
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "on" }] },
          { featureType: "road", elementType: "labels", stylers: [{ visibility: "on" }] },
          { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      
      // Add markers for each distribution center
      const infoWindow = new google.maps.InfoWindow();
      
      DISTRIBUTION_CENTERS.forEach((center) => {
        const marker = new google.maps.Marker({
          position: { lat: center.lat, lng: center.lng },
          map,
          title: center.name,
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#2D5E40",
            fillOpacity: 0.7,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
          },
        });
        
        marker.addListener("click", () => {
          infoWindow.setContent(`
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 5px;">${center.name}</h3>
              <p style="font-size: 0.9em; color: #555;">${center.address}</p>
              <a href="https://maps.google.com/?q=${center.lat},${center.lng}" target="_blank" style="color: #2D5E40; text-decoration: underline; display: block; margin-top: 8px;">Get Directions</a>
            </div>
          `);
          infoWindow.open(map, marker);
          setSelectedLocation(center);
        });
      });
      
      // Add a custom Earth rotation control
      const controlDiv = document.createElement("div");
      controlDiv.style.padding = "10px";
      
      const controlUI = document.createElement("div");
      controlUI.style.backgroundColor = "#2D5E40";
      controlUI.style.borderRadius = "4px";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginBottom = "22px";
      controlUI.style.textAlign = "center";
      controlUI.title = "Toggle Earth Rotation";
      controlDiv.appendChild(controlUI);
      
      const controlText = document.createElement("div");
      controlText.style.color = "rgb(255,255,255)";
      controlText.style.fontFamily = "Roboto,Arial,sans-serif";
      controlText.style.fontSize = "12px";
      controlText.style.lineHeight = "30px";
      controlText.style.paddingLeft = "10px";
      controlText.style.paddingRight = "10px";
      controlText.innerHTML = "3D View";
      controlUI.appendChild(controlText);
      
      controlUI.addEventListener("click", () => {
        map.setMapTypeId(map.getMapTypeId() === 'roadmap' ? 'hybrid' : 'roadmap');
        controlText.innerHTML = map.getMapTypeId() === 'roadmap' ? "3D View" : "2D View";
      });
      
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
      
      // Set map initialization state
      setMapInitialized(true);
    };

    loadGoogleMapsApi();
  }, []);

  return (
    <section id="locations" className="relative py-24 px-4 bg-nature-50/50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedText
            tag="h2"
            text="Find Our Distribution Centers"
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
          />
          <AnimatedText
            tag="p"
            text="Explore our network of distribution centers across the United States. Visit a location near you or get directions for easy access to premium products."
            className="text-muted-foreground text-lg"
            delay={200}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-6">
            <div className="bg-white rounded-xl soft-border shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto no-scrollbar">
                {DISTRIBUTION_CENTERS.map((center) => (
                  <button
                    key={center.id}
                    onClick={() => setSelectedLocation(center)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-nature-100/50 border-l-4",
                      selectedLocation?.id === center.id 
                        ? "border-l-nature-500 bg-nature-100/50" 
                        : "border-l-transparent"
                    )}
                  >
                    <h4 className="font-medium text-foreground">{center.name}</h4>
                    <p className="text-sm text-muted-foreground">{center.address}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {selectedLocation && (
              <div className="bg-white rounded-xl soft-border shadow-sm p-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-1">{selectedLocation.name}</h3>
                <p className="text-muted-foreground mb-4">{selectedLocation.address}</p>
                <div className="flex space-x-3">
                  <a
                    href={`https://maps.google.com/?q=${selectedLocation.lat},${selectedLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 bg-nature-500 text-white rounded-md hover:bg-nature-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22L4 17.5V6.5L12 2L20 6.5V17.5L12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 6.5L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 6.5L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Get Directions
                  </a>
                  <a
                    href={`tel:+1555-123-4567`}
                    className="inline-flex items-center justify-center px-4 py-2 border border-nature-200 text-nature-700 rounded-md hover:bg-nature-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.44 21.96 16.96 21.73 15.56 21.28C14.1514 20.8362 12.8249 20.1801 11.63 19.34C10.4411 18.5098 9.38308 17.5341 8.48 16.44C7.63955 15.2451 6.98306 13.9187 6.54 12.51C6.09 11.11 5.86 9.63 5.86 8.11C5.85946 7.56063 6.06953 7.03149 6.44438 6.65636C6.81923 6.28123 7.3482 6.07067 7.8975 6.07C8.14502 6.06935 8.38742 6.13246 8.59844 6.25331C8.80945 6.37416 8.9819 6.54881 9.1 6.76L10.61 9.09C10.7148 9.25209 10.7796 9.43324 10.7996 9.62178C10.8196 9.81033 10.7943 10.001 10.7253 10.179C10.4733 10.7543 10.1558 11.2998 9.78 11.81L9.35 12.41C10.1124 13.7952 11.1553 15.0023 12.42 15.95L13.11 15.42C13.6146 15.0458 14.155 14.7298 14.725 14.48C14.9043 14.4115 15.0952 14.3878 15.2835 14.4103C15.4718 14.4328 15.6512 14.5011 15.81 14.61L18.09 16.16C18.3035 16.2769 18.4806 16.4488 18.604 16.6582C18.7274 16.8676 18.7929 17.1075 18.7929 17.3514C18.7929 17.5952 18.7274 17.8351 18.604 18.0445C18.4806 18.2539 18.3035 18.4258 18.09 18.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Call Store
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <div 
              className={cn(
                "w-full h-[500px] lg:h-[600px] rounded-xl overflow-hidden soft-border shadow-lg relative",
                !mapInitialized && "flex items-center justify-center bg-nature-100/50"
              )}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-nature-200 border-t-nature-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-nature-700 font-medium">Loading Map...</p>
                  </div>
                </div>
              )}
              <div ref={mapRef} className="w-full h-full"></div>
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-nature-700 shadow-md">
                  Click on a marker to view distribution center details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
