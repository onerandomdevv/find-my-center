import React from 'react';
import Link from 'next/link';

type VariantRequestId = 'primary' | 'secondary' | 'outline';

interface BaseProps {
    variant?: VariantRequestId;
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
}

type ButtonOrLinkProps =
    | (BaseProps &
        React.ButtonHTMLAttributes<HTMLButtonElement> & {
            href?: undefined;
        })
    | (BaseProps &
        React.AnchorHTMLAttributes<HTMLAnchorElement> & {
            href: string;
        });

export const Button: React.FC<ButtonOrLinkProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';

    const variants = {
        primary: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-500',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
        outline:
            'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    const classes = `${baseStyles} ${variants[variant]} ${widthStyles} ${className}`;

    if (props.href) {
        const { href, ...linkProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
        return (
            <Link href={href} className={classes} {...linkProps}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
};
