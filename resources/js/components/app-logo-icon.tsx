import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4H4ZM4 6H28V8H4V6ZM4 10H28V12H4V10ZM4 14H28V16H4V14ZM4 18H28V20H4V18ZM4 22H28V24H4V22ZM6 26V14H8V26H6ZM14 26V18H16V26H14ZM22 26V12H24V26H22Z"
            />
        </svg>
    );
}