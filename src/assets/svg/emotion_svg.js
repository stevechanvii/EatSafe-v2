import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Excellent = props => (
    <Svg viewBox="0 0 50 50" width={props.width} height={props.height} fill={props.color}>
        <Path
            style={{
                lineHeight: 'normal',
                textIndent: 0,
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                blockProgression: 'tb',
                isolation: 'auto',
                mixBlendMode: 'normal',
            }}
            d="M25 2C12.31 2 2 12.31 2 25s10.31 23 23 23c4.807 0 9.268-1.493 12.959-4.018.092.004.183.019.275.018 1.197-.007 2.42-.433 3.37-1.385.93-.933 1.355-2.129 1.388-3.31A22.902 22.902 0 0 0 48 25C48 12.31 37.69 2 25 2zm0 2c11.61 0 21 9.39 21 21 0 4.233-1.263 8.156-3.414 11.451-.727-2.403-2.299-4.458-3.703-5.98l.012-.024a1 1 0 1 0-1.79-.894s-1.166 2.352-3.681 4.412a1 1 0 0 0-.31.234C31.172 35.706 28.5 37 25 37c-8.407 0-12.105-7.447-12.105-7.447a1 1 0 0 0-.88-.565 1 1 0 0 0-.91 1.46S15.407 39 25 39c1.22 0 2.352-.14 3.402-.38.355.372 1.305 1.345 2.844 2.503 1.111.836 2.44 1.692 3.887 2.252A20.837 20.837 0 0 1 25 46C13.39 46 4 36.61 4 25S13.39 4 25 4zm-9 14c-3.34 0-5.686 2.271-5.686 2.271a1 1 0 1 0 1.372 1.458S13.588 20 16 20s4.314 1.729 4.314 1.729a1 1 0 1 0 1.372-1.458S19.34 18 16 18zm18 0c-3.34 0-5.686 2.271-5.686 2.271a1 1 0 1 0 1.372 1.458S31.588 20 34 20c2.411 0 4.313 1.729 4.313 1.729a1 1 0 1 0 1.37-1.458S37.34 18 34 18zm3.75 14.207c1.58 1.805 3.124 4.227 3.227 6.654a1 1 0 0 0 .02.395c-.022.767-.241 1.378-.81 1.947-.58.582-1.189.792-1.964.797-.077 0-.157-.014-.235-.018a1 1 0 0 0-.402-.027c-1.7-.22-3.622-1.29-5.137-2.43a23.139 23.139 0 0 1-1.892-1.597 15.386 15.386 0 0 0 3.207-1.75l3.529 3.529a1 1 0 1 0 1.414-1.414l-3.379-3.379a17.927 17.927 0 0 0 2.422-2.707z"
            fontWeight={400}
            fontFamily="sans-serif"
            overflow="visible"
        />
    </Svg>
);

const Good = props => (
    <Svg viewBox="0 0 50 50" width={props.width} height={props.height} fill={props.color}>
        <Path
            style={{
                lineHeight: 'normal',
                textIndent: 0,
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                blockProgression: 'tb',
                isolation: 'auto',
                mixBlendMode: 'normal',
            }}
            d="M25 2a1 1 0 0 0-.154.016C12.227 2.1 2 12.36 2 25c0 12.691 10.309 23 23 23s23-10.309 23-23C48 12.363 37.775 2.103 25.158 2.016A1 1 0 0 0 25 2zm0 2c11.61 0 21 9.39 21 21s-9.39 21-21 21S4 36.61 4 25 13.39 4 25 4zm-8 14a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm16 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zM11.957 28.988a1 1 0 0 0-.771 1.594S16.416 38 25 38c8.583 0 13.814-7.418 13.814-7.418a1.001 1.001 0 0 0-1.628-1.164S32.416 36 25 36c-7.417 0-12.186-6.582-12.186-6.582a1 1 0 0 0-.857-.43z"
            fontWeight={400}
            fontFamily="sans-serif"
            overflow="visible"
        />
    </Svg>
);

const SoSo = props => (
    <Svg viewBox="0 0 50 50" width={props.width} height={props.height} fill={props.color}>
        <Path
            style={{
                lineHeight: 'normal',
                textIndent: 0,
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                blockProgression: 'tb',
                isolation: 'auto',
                mixBlendMode: 'normal',
            }}
            d="M25 2C12.311 2 2 12.311 2 25s10.311 23 23 23 23-10.311 23-23C48 12.366 37.773 2.104 25.16 2.016A1 1 0 0 0 25 2zm0 2c11.607 0 21 9.393 21 21s-9.393 21-21 21S4 36.607 4 25 13.393 4 25 4zm-8 14a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm16 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zM15 31a1 1 0 1 0 0 2h20a1 1 0 1 0 0-2H15z"
            fontWeight={400}
            fontFamily="sans-serif"
            overflow="visible"
        />
    </Svg>
);

const NotWell = props => (
    <Svg viewBox="0 0 50 50" width={props.width} height={props.height} fill={props.color}>
        <Path
            style={{
                lineHeight: 'normal',
                textIndent: 0,
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                blockProgression: 'tb',
                isolation: 'auto',
                mixBlendMode: 'normal',
            }}
            d="M25 2C12.309 2 2 12.309 2 25s10.309 23 23 23 23-10.309 23-23C48 12.363 37.775 2.103 25.158 2.016A1 1 0 0 0 25 2zm0 2c11.61 0 21 9.39 21 21s-9.39 21-21 21S4 36.61 4 25 13.39 4 25 4zm-8 14a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm16 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3zm-8 11c-6.444 0-10.707 4.293-10.707 4.293a1 1 0 1 0 1.414 1.414S19.444 31 25 31c5.556 0 9.293 3.707 9.293 3.707a1 1 0 1 0 1.414-1.414S31.444 29 25 29z"
            fontWeight={400}
            fontFamily="sans-serif"
            overflow="visible"
        />
    </Svg>
);

const Awful = props => (
    <Svg viewBox="0 0 50 50" width={props.width} height={props.height} fill={props.color}>
        <Path
            style={{
                lineHeight: 'normal',
                textIndent: 0,
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                blockProgression: 'tb',
                isolation: 'auto',
                mixBlendMode: 'normal',
            }}
            d="M25 2a1 1 0 0 0-.154.016C12.227 2.1 2 12.36 2 25c0 12.691 10.309 23 23 23 7.243 0 13.71-3.36 17.926-8.6.607.374 1.314.6 2.074.6 2.197 0 4-1.803 4-4 0-2.274-.7-4.096-1.664-5.523.43-1.757.664-3.59.664-5.477C48 12.309 37.691 2 25 2zm0 2c11.61 0 21 9.39 21 21a21.05 21.05 0 0 1-.313 3.576c-.19-.171-.38-.338-.57-.488-1.912-1.502-3.842-2.049-3.842-2.049A1 1 0 0 0 40.98 26a1 1 0 0 0-.94 1.275S41 30.623 41 36c0 .71.203 1.368.531 1.947C37.686 42.85 31.72 46 25 46 13.39 46 4 36.61 4 25S13.39 4 25 4zm-9 9c-3.34 0-5.686 2.271-5.686 2.271a1 1 0 1 0 1.372 1.458S13.588 15 16 15s4.314 1.729 4.314 1.729a1 1 0 1 0 1.372-1.458S19.34 13 16 13zm18 0c-3.34 0-5.686 2.271-5.686 2.271a1 1 0 1 0 1.372 1.458S31.588 15 34 15c2.411 0 4.313 1.729 4.313 1.729a1 1 0 1 0 1.37-1.458S37.34 13 34 13zm-21.045 6.002a1 1 0 0 0-.271.049s-1.658.55-3.305 1.853C7.732 22.208 6 24.386 6 27.5c0 .24.025.474.072.701C6.401 29.791 7.82 31 9.5 31c.24 0 .474-.025.701-.072a3.532 3.532 0 0 0 2.522-2.07c.178-.419.277-.878.277-1.358 0-.489.015-.969.041-1.434.184-3.253.918-5.787.918-5.787a1 1 0 0 0-1.004-1.277zm-1.422 2.953c-.2 1.068-.4 2.427-.488 3.96-.03.51-.045 1.04-.045 1.585A1.482 1.482 0 0 1 9.5 29c-.84 0-1.5-.66-1.5-1.5 0-.298.02-.584.057-.857.26-1.915 1.38-3.235 2.564-4.172.458-.363.508-.289.912-.516zM25 22c-5.367 0-8.515 3.066-10.127 6.021-1.612 2.956-1.87 5.89-1.87 5.89a1 1 0 0 0 1.161 1.075S20.134 34 25 34c4.867 0 10.836.986 10.836.986a1 1 0 0 0 1.16-1.076s-.257-2.933-1.869-5.889C33.515 25.066 30.367 22 25 22zm0 2c4.633 0 6.985 2.434 8.373 4.979a13.464 13.464 0 0 1 1.397 3.841C33.112 32.567 29.154 32 25 32s-8.112.567-9.77.82c.203-.982.559-2.305 1.397-3.841C18.015 26.434 20.367 24 25 24zm17.377 4.748c.481.256.956.482 1.506.914C45.47 30.91 47 32.833 47 36c0 1.115-.885 2-2 2s-2-.885-2-2c0-3.373-.324-5.66-.623-7.252z"
            fontWeight={400}
            fontFamily="sans-serif"
            overflow="visible"
        />
    </Svg>
);

export default { Excellent, Good, SoSo, NotWell, Awful };
