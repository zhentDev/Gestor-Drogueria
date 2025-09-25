import React from 'react';

interface PercentageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    min?: number;
    max?: number;
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
    className,
    min = 0,
    max = 100,
    onChange,
    onBlur, // Capturamos onBlur para no sobrescribirlo
    ...props
}) => {

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // 1. Si el componente padre pasó su propio onBlur, lo ejecutamos primero.
        if (onBlur) {
            onBlur(e);
        }

        // 2. Obtenemos el valor y lo convertimos a número.
        const currentValue = parseFloat(e.target.value);
        if (isNaN(currentValue)) return; // No hacemos nada si no es un número.

        let correctedValue = currentValue;

        // 3. Comparamos con los límites y corregimos si es necesario.
        if (min !== undefined && currentValue < min) {
            correctedValue = min;
        } else if (max !== undefined && currentValue > max) {
            correctedValue = max;
        }

        // 4. Si el valor fue corregido, notificamos al componente padre.
        //    Esto es CRUCIAL para que el estado se actualice correctamente.
        if (correctedValue !== currentValue && onChange) {
            // Creamos un "evento sintético" para que el onChange del padre funcione como espera.
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: correctedValue.toString(),
                },
            };
            onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="relative w-full">
            <input
                type="number"
                className={`w-full border-b-2 border-black mb-4 rounded-md rounded-b-none py-2 pl-3 pr-8 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6  focus:outline-none ${className}`}
                // Pasamos min y max también al input para el comportamiento nativo del navegador
                min={min}
                max={max}
                onChange={onChange} // El onChange original se pasa directamente
                onBlur={handleBlur} // Usamos nuestro manejador de blur con la lógica de corrección
                {...props}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">%</span>
            </div>
        </div>
    );
};

export default PercentageInput;