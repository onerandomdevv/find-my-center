import React from 'react';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    placeholder = 'Select an option',
    id,
    className = '',
    ...props
}) => {
    // Use provided ID or fallback to a generated one for label association
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={selectId}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    id={selectId}
                    className={`
            block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-8 text-base text-gray-900 transition-colors
            focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
            disabled:bg-gray-50 disabled:text-gray-500
            ${className}
          `}
                    {...props}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
