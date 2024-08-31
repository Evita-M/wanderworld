import { Container, Slider, Stack, Typography } from '@mui/material'
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form'

type RHFSliderProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    min?: number
    max?: number
}

export function RHFSlider<T extends FieldValues>({
    name,
    label,
    min = 0,
    max = 100,
}: RHFSliderProps<T>) {
    const { control } = useFormContext<T>()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <Stack>
                    <Typography fontSize="22px" mb="24px">
                        {label}
                    </Typography>
                    <Container>
                        <Slider
                            min={min}
                            max={max}
                            {...field}
                            valueLabelDisplay="auto"
                        />
                    </Container>
                </Stack>
            )}
        />
    )
}
