import React from 'react'
import Svg, { Path, G } from 'react-native-svg'

/**
 * These are svg icons from icons8 (https://icons8.com/license), I subscribed when I developed this app. 
 * Do read the license before using!!
 */
const Scan = props => (
  <Svg viewBox="0 0 128 128" {...props}>
    <Path
      d="M16 115c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3s3 1.3 3 3v26c0 1.7-1.3 3-3 3z"
      fill="#444b54"
    />
    <G fill="#444b54">
      <Path d="M31 86h6v26h-6z" />
      <Path d="M37 115h-6c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v26c0 1.7-1.3 3-3 3z" />
    </G>
    <Path
      d="M52 115c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3s3 1.3 3 3v26c0 1.7-1.3 3-3 3zM67 115c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3s3 1.3 3 3v26c0 1.7-1.3 3-3 3z"
      fill="#444b54"
    />
    <G fill="#444b54">
      <Path d="M82 86h6v26h-6z" />
      <Path d="M88 115h-6c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v26c0 1.7-1.3 3-3 3z" />
    </G>
    <Path
      d="M100 115c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3s3 1.3 3 3v26c0 1.7-1.3 3-3 3zM112 115c-1.7 0-3-1.3-3-3V86c0-1.7 1.3-3 3-3s3 1.3 3 3v26c0 1.7-1.3 3-3 3z"
      fill="#444b54"
    />
    <G>
      <Path
        d="M16 75c-1.7 0-3-1.3-3-3V16c0-1.7 1.3-3 3-3s3 1.3 3 3v56c0 1.7-1.3 3-3 3z"
        fill="#444b54"
      />
      <G fill="#444b54">
        <Path d="M31 72V16h6v56" />
        <Path d="M37 75c-1.7 0-3-1.3-3-3 0 1.7-1.3 3-3 3s-3-1.3-3-3V16c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v56c0 1.7-1.3 3-3 3z" />
      </G>
      <Path
        d="M52 75c-1.7 0-3-1.3-3-3V16c0-1.7 1.3-3 3-3s3 1.3 3 3v56c0 1.7-1.3 3-3 3zM67 75c-1.7 0-3-1.3-3-3V16c0-1.7 1.3-3 3-3s3 1.3 3 3v56c0 1.7-1.3 3-3 3z"
        fill="#444b54"
      />
      <G fill="#444b54">
        <Path d="M82 72V16h6v56" />
        <Path d="M88 75c-1.7 0-3-1.3-3-3 0 1.7-1.3 3-3 3s-3-1.3-3-3V16c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3v56c0 1.7-1.3 3-3 3z" />
      </G>
      <Path
        d="M100 75c-1.7 0-3-1.3-3-3V16c0-1.7 1.3-3 3-3s3 1.3 3 3v56c0 1.7-1.3 3-3 3zM112 75c-1.7 0-3-1.3-3-3V16c0-1.7 1.3-3 3-3s3 1.3 3 3v56c0 1.7-1.3 3-3 3z"
        fill="#444b54"
      />
    </G>
    <G>
      <Path
        d="M124 75H4c-1.7 0-3-1.3-3-3s1.3-3 3-3h120c1.7 0 3 1.3 3 3s-1.3 3-3 3z"
        fill="#ff5576"
      />
    </G>
  </Svg>
);

const Barcode = props => (
  <Svg viewBox="0 0 128 128" {...props}>
    <Path d="M16 13c-1.7 0-3 1.3-3 3v53H4c-1.7 0-3 1.3-3 3s1.3 3 3 3h120c1.7 0 3-1.3 3-3s-1.3-3-3-3h-9V16c0-1.7-1.3-3-3-3s-3 1.3-3 3v53h-6V16c0-1.7-1.3-3-3-3s-3 1.3-3 3v53h-6V16c0-1.7-1.3-3-3-3h-6c-1.7 0-3 1.3-3 3v53h-9V16c0-1.7-1.3-3-3-3s-3 1.3-3 3v53h-9V16c0-1.7-1.3-3-3-3s-3 1.3-3 3v53h-9V16c0-1.7-1.3-3-3-3h-6c-1.7 0-3 1.3-3 3v53h-9V16c0-1.7-1.3-3-3-3zm0 70c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3s3-1.3 3-3V86c0-1.7-1.3-3-3-3zm15 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3V86c0-1.7-1.3-3-3-3h-6zm21 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3s3-1.3 3-3V86c0-1.7-1.3-3-3-3zm15 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3s3-1.3 3-3V86c0-1.7-1.3-3-3-3zm15 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3V86c0-1.7-1.3-3-3-3h-6zm18 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3s3-1.3 3-3V86c0-1.7-1.3-3-3-3zm12 0c-1.7 0-3 1.3-3 3v26c0 1.7 1.3 3 3 3s3-1.3 3-3V86c0-1.7-1.3-3-3-3z" />
  </Svg>
);

export default { Scan, Barcode };
