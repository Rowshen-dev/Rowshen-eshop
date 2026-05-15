import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, MeshDistortMaterial, Float, Environment } from '@react-three/drei';

function Phone() {
  const phoneRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    phoneRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    phoneRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={phoneRef}>
        {/* Корпус телефона */}
        <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.12} smoothness={8} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Экран */}
        <RoundedBox ref={screenRef} args={[1.0, 2.0, 0.01]} radius={0.08} smoothness={8} position={[0, 0, 0.07]}>
          <meshStandardMaterial color="#0a0a2e" emissive="#ff4d00" emissiveIntensity={0.15} metalness={0.1} roughness={0.0} />
        </RoundedBox>

        {/* Линии на экране — имитация UI */}
        <mesh position={[0, 0.6, 0.08]}>
          <planeGeometry args={[0.7, 0.05]} />
          <meshStandardMaterial color="#ff4d00" emissive="#ff4d00" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0.45, 0.08]}>
          <planeGeometry args={[0.5, 0.03]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0.3, 0.08]}>
          <planeGeometry args={[0.55, 0.03]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>

        {/* Карточка товара на экране */}
        <RoundedBox args={[0.75, 0.5, 0.01]} radius={0.04} smoothness={4} position={[0, -0.1, 0.08]}>
          <meshStandardMaterial color="#161616" emissive="#ff4d00" emissiveIntensity={0.05} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.085]}>
          <planeGeometry args={[0.55, 0.08]} />
          <meshStandardMaterial color="#ff4d00" emissive="#ff4d00" emissiveIntensity={0.8} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -0.12, 0.085]}>
          <planeGeometry args={[0.4, 0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#fff" emissiveIntensity={0.3} transparent opacity={0.25} />
        </mesh>

        {/* Кнопка Home внизу */}
        <mesh position={[0, -1.05, 0.07]}>
          <cylinderGeometry args={[0.08, 0.08, 0.01, 32]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Камера сверху */}
        <mesh position={[0, 1.05, 0.07]}>
          <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0} />
        </mesh>

        {/* Боковые кнопки */}
        <RoundedBox args={[0.04, 0.2, 0.04]} radius={0.01} position={[0.63, 0.3, 0]}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[0.04, 0.15, 0.04]} radius={0.01} position={[-0.63, 0.1, 0]}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Свечение под телефоном */}
        <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.8, 32]} />
          <MeshDistortMaterial color="#ff4d00" emissive="#ff4d00" emissiveIntensity={0.5} transparent opacity={0.15} distort={0.3} speed={2} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const count = 60;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ff4d00" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function PhoneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#ff4d00" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#00c2ff" />
      <spotLight position={[0, 5, 2]} intensity={1} color="#ffffff" />
      <Environment preset="night" />
      <Particles />
      <Phone />
    </Canvas>
  );
}