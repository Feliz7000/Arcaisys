"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GlobePoint = {
  lat: number;
  lon: number;
  count: number;
  spreadLat: number;
  spreadLon: number;
};

const EARTH_RADIUS = 1.08;

const CONTINENT_CLUSTERS: GlobePoint[] = [
  // North America
  { lat: 47, lon: -100, count: 1200, spreadLat: 12, spreadLon: 20 },
  { lat: 38, lon: -122, count: 750, spreadLat: 10, spreadLon: 16 },
  { lat: 60, lon: -95, count: 450, spreadLat: 9, spreadLon: 15 },
  // South America
  { lat: -12, lon: -60, count: 1000, spreadLat: 15, spreadLon: 11 },
  { lat: -35, lon: -63, count: 600, spreadLat: 9, spreadLon: 9 },
  // Europe + Africa
  { lat: 51, lon: 10, count: 900, spreadLat: 10, spreadLon: 12 },
  { lat: 11, lon: 18, count: 1200, spreadLat: 18, spreadLon: 16 },
  { lat: -22, lon: 24, count: 650, spreadLat: 10, spreadLon: 12 },
  // Asia
  { lat: 41, lon: 88, count: 1900, spreadLat: 18, spreadLon: 31 },
  { lat: 22, lon: 108, count: 1100, spreadLat: 12, spreadLon: 18 },
  { lat: 59, lon: 100, count: 600, spreadLat: 10, spreadLon: 16 },
  // Australia
  { lat: -26, lon: 134, count: 600, spreadLat: 8, spreadLon: 11 },
];

function latLonToVector3(lat: number, lon: number, radius = EARTH_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function sampleNormal(seed: number) {
  const u = Math.max(0.0001, pseudoRandom(seed));
  const v = pseudoRandom(seed + 1.337);
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function buildLandCloud(pointScale: number) {
  const vertices: number[] = [];
  const colors: number[] = [];
  const colorA = new THREE.Color("#FFA500");
  const colorB = new THREE.Color("#FF6B00");
  const colorC = new THREE.Color("#E63000");
  const colorMix = new THREE.Color();

  for (const [clusterIndex, cluster] of CONTINENT_CLUSTERS.entries()) {
    const count = Math.floor(cluster.count * pointScale);

    for (let i = 0; i < count; i += 1) {
      const seed = clusterIndex * 100000 + i * 7 + 11;
      const lat = cluster.lat + sampleNormal(seed) * cluster.spreadLat;
      const lon = cluster.lon + sampleNormal(seed + 31) * cluster.spreadLon;
      const altitude = EARTH_RADIUS + pseudoRandom(seed + 53) * 0.013;
      const vec = latLonToVector3(lat, lon, altitude);

      vertices.push(vec.x, vec.y, vec.z);

      const t = pseudoRandom(seed + 79);
      if (t < 0.5) {
        colorMix.copy(colorA).lerp(colorB, t * 2);
      } else {
        colorMix.copy(colorB).lerp(colorC, (t - 0.5) * 2);
      }
      colors.push(colorMix.r, colorMix.g, colorMix.b);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geometry;
}

function GlobeScene({ mobile, reducedMotion }: { mobile: boolean; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  const landGeometry = useMemo(() => {
    const pointScale = mobile ? 0.46 : 1;
    return buildLandCloud(pointScale);
  }, [mobile]);

  useEffect(() => {
    return () => {
      landGeometry.dispose();
    };
  }, [landGeometry]);

  const cityVectors = useMemo(() => {
    return [
      latLonToVector3(37.7749, -122.4194, 1.12),
      latLonToVector3(40.7128, -74.006, 1.12),
      latLonToVector3(51.5074, -0.1278, 1.12),
      latLonToVector3(19.076, 72.8777, 1.12),
      latLonToVector3(35.6762, 139.6503, 1.12),
      latLonToVector3(-33.8688, 151.2093, 1.12),
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const speed = reducedMotion ? 0.04 : 0.12;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
  });

  const starGeometry = useMemo(() => {
    const stars = mobile ? 350 : 700;
    const points: number[] = [];

    for (let i = 0; i < stars; i += 1) {
      const r = 2.4 + pseudoRandom(i + 5) * 1.4;
      const theta = pseudoRandom(i + 37) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i + 71) - 1);
      points.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [mobile]);

  useEffect(() => {
    return () => {
      starGeometry.dispose();
    };
  }, [starGeometry]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[2.5, 2.5, 3]} intensity={1.8} color="#FFA500" />
      <pointLight position={[-2.5, -1.8, -2]} intensity={0.9} color="#E63000" />

      <points geometry={starGeometry}>
        <pointsMaterial color="#FF6B00" size={0.008} sizeAttenuation opacity={0.14} transparent />
      </points>

      <group ref={groupRef} scale={0.9}>
        <mesh>
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshStandardMaterial
            color="#1a0d00"
            emissive="#8B0000"
            emissiveIntensity={0.18}
            roughness={0.95}
            metalness={0}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={1.07}>
          <sphereGeometry args={[1.06, 40, 40]} />
          <meshBasicMaterial color="#E63000" transparent opacity={0.09} side={THREE.BackSide} />
        </mesh>

        <mesh scale={1.11}>
          <sphereGeometry args={[1.08, 48, 48]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>

        <points geometry={landGeometry}>
          <pointsMaterial
            size={mobile ? 0.016 : 0.014}
            vertexColors
            sizeAttenuation
            transparent
            opacity={1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </points>

        {cityVectors.map((city, index) => (
          <PulseMarker key={index} position={city} reducedMotion={reducedMotion} />
        ))}
      </group>
    </>
  );
}

function PulseMarker({ position, reducedMotion }: { position: THREE.Vector3; reducedMotion: boolean }) {
  const markerRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!markerRef.current || reducedMotion) return;

    const s = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.22;
    markerRef.current.scale.setScalar(s);
  });

  return (
    <mesh
      position={position}
      ref={markerRef}
    >
      <sphereGeometry args={[0.018, 12, 12]} />
      <meshBasicMaterial color="#FFA500" />
    </mesh>
  );
}

export function NodeEarthGlobe() {
  const [mobile, setMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaMobile = window.matchMedia("(max-width: 768px)");
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setMobile(mediaMobile.matches);
      setReducedMotion(mediaReduce.matches);
    };

    apply();
    mediaMobile.addEventListener("change", apply);
    mediaReduce.addEventListener("change", apply);

    return () => {
      mediaMobile.removeEventListener("change", apply);
      mediaReduce.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div
      className="relative pointer-events-none"
      style={{ width: "min(860px, 84vw)", height: "min(860px, 84vw)" }}
    >
      <Canvas
        dpr={mobile ? [1, 1.3] : [1, 1.7]}
        camera={{ position: [0, 0, 3.45], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeScene mobile={mobile} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
