import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

const empty1 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path
            fill="#616161"
            d="M36.928 38.696l1.768-1.767 9.313 9.312-1.768 1.768z"
        />
        <Path
            d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
            fill="#ffa000"
        />
        <Path
            d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"
            fill="#ffca28"
        />
        <Circle cx={35} cy={35} r={10} fill="#616161" />
        <Circle cx={35} cy={35} r={8} fill="#64b5f6" />
        <Path
            fill="#37474f"
            d="M42.303 44.072l1.768-1.768 3.937 3.937-1.768 1.768z"
        />
        <Path
            d="M38.979 33a.998.998 0 0 1-.799-.397C37.41 31.584 36.251 31 35 31s-2.41.584-3.18 1.603a1 1 0 1 1-1.595-1.205C31.376 29.874 33.116 29 35 29s3.624.874 4.775 2.397A.999.999 0 0 1 38.979 33z"
            fill="#bbdefb"
        />
    </Svg>
);

const empty2 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path d="M29 10L17 6 5 10v32l12-4 12 4 12-4V6z" fill="#ffecb3" />
        <Path d="M17 6v32l12 4V10z" fill="#ffe082" />
        <Path
            d="M42.68 8.14l-2.82-2.816a1.099 1.099 0 0 0-1.555 0l-1.328 1.324 4.375 4.375 1.328-1.328a1.106 1.106 0 0 0 0-1.554"
            fill="#e57373"
        />
        <Path
            d="M22.473 21.148L34.785 8.832l4.38 4.375-12.317 12.316z"
            fill="#ff9800"
        />
        <Path
            d="M41.352 11.027l-2.188 2.188L34.79 8.84l2.188-2.188z"
            fill="#b0bec5"
        />
        <Path d="M22.473 21.152L21 27l5.848-1.473z" fill="#ffc107" />
        <Path d="M21.742 24.043L21 27l2.957-.742z" fill="#37474f" />
    </Svg>
);

const empty3 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path d="M5 22h2v4H5zM41 22h2v4h-2z" fill="#546e7a" />
        <Path d="M7 23h34v2H7z" fill="#37474f" />
        <Path d="M40 19H8v20a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4z" fill="#ffc107" />
        <Path
            d="M36 38c0 1.105-.895 2-2 2H14c-1.105 0-2-.895-2-2v-7h24z"
            fill="#37474f"
        />
        <Path d="M36 31H12v-2s0-1 1-1h22c1 0 1 1 1 1z" fill="#ffecb3" />
        <Path
            d="M16 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM16 37c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM34 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM34 37c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM19 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM22 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM25 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM28 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM31 34c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM31 37a1 1 0 0 1-1 1H18a1 1 0 1 1 0-2h12a1 1 0 0 1 1 1z"
            fill="#b0bec5"
        />
        <Path
            d="M10 19v1c0 1.105.895 2 2 2h24c1.105 0 2-.895 2-2v-1z"
            fill="#37474f"
        />
        <Path
            d="M31 22c0 2.207-3.133 4-7 4s-7-1.793-7-4c0-2.21 3.133-4 7-4s7 1.79 7 4z"
            fill="#37474f"
        />
        <Path d="M12 5h24v15H12z" fill="#90caf9" />
        <Path
            d="M27 20.285c0-.95-1.344-1.715-3-1.715s-3 .766-3 1.715C21 21.23 22.344 22 24 22s3-.77 3-1.715z"
            fill="#90caf9"
        />
    </Svg>
);

const empty4 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path d="M45 34V18a8 8 0 0 0-8-8H16a8 8 0 0 0-8 8v16z" fill="#2196f3" />
        <Path
            d="M11 33c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1z"
            fill="#2196f3"
        />
        <Path
            d="M16 12c-3.309 0-6 2.691-6 6v14h12V18c0-3.309-2.691-6-6-6z"
            fill="#0d47a1"
        />
        <Path d="M28 4h6v4h-6z" fill="#ff3d00" />
        <Path d="M28 6h2v11h-2z" fill="#ff3d00" />
        <Path
            d="M31 18a1.999 1.999 0 1 1-4 0 1.999 1.999 0 1 1 4 0z"
            fill="#ff3d00"
        />
        <Path
            d="M30 18c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"
            fill="#dd2c00"
        />
        <Path d="M25 34h5v10h-5z" fill="#ffcc80" />
        <Path d="M25 34h5v2h-5z" fill="#ffa726" />
        <Path
            d="M16 12a6.003 6.003 0 0 0-5.488 3.586L22 32V18c0-3.309-2.691-6-6-6z"
            fill="#1a237e"
        />
    </Svg>
);

const empty5 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path d="M39 39H5V5h29l5 5z" fill="#f44336" />
        <Path
            d="M36 36c0 .555-.445 1-1 1H9c-.555 0-1-.445-1-1V22c0-.555.445-1 1-1h26c.555 0 1 .445 1 1z"
            fill="#fff"
        />
        <Path d="M12 28h20v2H12zM12 24h20v2H12zM12 32h20v2H12z" fill="#cfd8dc" />
        <Path
            d="M8 5v9c0 1.105.895 2 2 2h13c1.105 0 2-.895 2-2V5z"
            fill="#c62828"
        />
        <Path
            d="M14 5v9c0 1.105.895 2 2 2h13c1.105 0 2-.895 2-2V5z"
            fill="#b0bec5"
        />
        <Path d="M23 7h4v7h-4z" fill="#263238" />
        <Path
            d="M39.86 42.68l2.816-2.82c.43-.43.43-1.13 0-1.555l-1.328-1.328-4.375 4.375L38.3 42.68a1.11 1.11 0 0 0 1.558 0"
            fill="#e57373"
        />
        <Path
            d="M29.848 25.473l9.312 9.312-4.375 4.375-9.316-9.312z"
            fill="#ff9800"
        />
        <Path
            d="M36.973 41.352l-2.188-2.188 4.375-4.379 2.188 2.188z"
            fill="#b0bec5"
        />
        <Path d="M29.848 25.473L24 24l1.473 5.848z" fill="#ffc107" />
        <Path d="M26.957 24.742L24 24l.742 2.957z" fill="#37474f" />
    </Svg>
);

const empty6 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
        <Path fill="#d32f2f" d="M3 10h42v29H3z" />
        <Circle cx={24} cy={36} r={5} fill="#d32f2f" />
        <Circle cx={24} cy={36} r={3} fill="#4c0808" />
        <Path fill="#d7ccc8" d="M40 7l-15 3h-2L8 7l-2 5v24h36V12z" />
        <Path fill="#bcaaa4" d="M8 33.001h15V36h2v-2.999L40 33l2 3H6z" />
        <Path
            d="M40 7s-15 0-15 3v26c0-3 15-3 15-3V7zM8 7s15 0 15 3v26c0-3-15-3-15-3V7z"
            fill="#efebe9"
        />
        <Path fill="#bcaaa4" d="M23 10h2v26h-2z" />
    </Svg>
);

const empty7 = props => (
    <Svg viewBox="0 0 48 48" {...props}>
    <Path d="M10 7h28v7H10z" fill="#ab6400" />
    <Path d="M10 21H6v-8l4-6zM38 21h4v-8l-4-6z" fill="#8a5100" />
    <Path d="M39 14H15l17-9z" fill="#4fc3f7" />
    <Path d="M36 14H10L26 3z" fill="#81d4fa" />
    <Path d="M33 14H9l6-12z" fill="#b3e5fc" />
    <Path
      d="M40 41H8c-1.102 0-2-.898-2-2V13h36v26c0 1.102-.898 2-2 2z"
      fill="#ff9800"
    />
    <Path
      d="M27.5 20h-7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
      fill="#8a5100"
    />
  </Svg>
);

export default { empty1, empty2, empty3, empty4, empty5, empty6, empty7 };
