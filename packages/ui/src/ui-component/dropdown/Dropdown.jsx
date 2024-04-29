import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Popper, FormControl, TextField, Box, Typography } from '@mui/material'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { translationObject } from '@/translate'
const StyledPopper = styled(Popper)({
    boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
    borderRadius: '10px',
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 10,
            margin: 10
        }
    }
})

export const Dropdown = ({ name, value, loading, options, onSelect, disabled = false, disableClearable = false }) => {
    const customization = useSelector((state) => state.customization)
    const findMatchingOptions = (options = [], value) => options.find((option) => option.name === value)
    const getDefaultOptionValue = () => ''
    let [internalValue, setInternalValue] = useState(value ?? 'choose an option')

    return (
        <FormControl sx={{ mt: 1, width: '100%' }} size='small'>
            <Autocomplete
                id={name}
                disabled={disabled}
                disableClearable={disableClearable}
                size='small'
                loading={loading}
                options={options || []}
                value={findMatchingOptions(options, internalValue) || getDefaultOptionValue()}
                onChange={(e, selection) => {
                    const value = selection ? selection.name : ''
                    setInternalValue(value)
                    onSelect(value)
                }}
                PopperComponent={StyledPopper}
                renderInput={(params) => (
                    <TextField {...params} value={internalValue} sx={{ height: '100%', '& .MuiInputBase-root': { height: '100%' } }} />
                )}
                renderOption={(props, option) => (
                    <Box component='li' {...props}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant='h5'>{translationObject[option.label] || option.label}</Typography>
                            {option.description && (
                                <Typography sx={{ color: customization.isDarkMode ? '#9e9e9e' : '' }}>
                                    {translationObject[option.description] || option.description}
                                </Typography>
                            )}
                        </div>
                    </Box>
                )}
                sx={{ height: '100%' }}
            />
        </FormControl>
    )
}

Dropdown.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    loading: PropTypes.bool,
    options: PropTypes.array,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    disableClearable: PropTypes.bool
}
