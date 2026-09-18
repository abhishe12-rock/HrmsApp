import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, G } from 'react-native-svg';

interface Hrm3dLogoProps {
  size?: number;
}

export const Hrm3dLogo: React.FC<Hrm3dLogoProps> = ({ size = 36 }) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg viewBox="0 0 100 100" width={size} height={size}>
        <Defs>
          <LinearGradient id="hexOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" />
            <Stop offset="35%" stopColor="#2563EB" />
            <Stop offset="100%" stopColor="#1E3A8A" />
          </LinearGradient>

          <LinearGradient id="cubeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#BAE6FD" />
          </LinearGradient>

          <LinearGradient id="cubeLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#60A5FA" />
            <Stop offset="100%" stopColor="#2563EB" />
          </LinearGradient>

          <LinearGradient id="cubeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#1D4ED8" />
          </LinearGradient>
        </Defs>

        <Path
          d="M50 4 L88 26 A6 6 0 0 1 91 31 L91 69 A6 6 0 0 1 88 74 L50 96 A6 6 0 0 1 44 96 L12 74 A6 6 0 0 1 9 69 L9 31 A6 6 0 0 1 12 26 L44 4 A6 6 0 0 1 50 4 Z"
          fill="url(#hexOuterGrad)"
        />

        <G transform="translate(50, 50)">
          <Path
            d="M0 -22 L19 -11 L0 0 L-19 -11 Z"
            fill="url(#cubeTopGrad)"
            opacity={0.95}
          />
          <Path
            d="M-19 -11 L0 0 L0 22 L-19 11 Z"
            fill="url(#cubeLeftGrad)"
            opacity={0.9}
          />
          <Path
            d="M0 0 L19 -11 L19 11 L0 22 Z"
            fill="url(#cubeRightGrad)"
            opacity={0.95}
          />
        </G>
      </Svg>
    </View>
  );
};
