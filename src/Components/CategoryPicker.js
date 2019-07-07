import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import usePromise from 'hooks/usePromise'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import TextField from '@material-ui/core/TextField'

import { getCategories } from 'api/categories'
import { stringToColor, invertColor } from 'utils/color'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  textInput: {
    flex: '1 0 75%',
    marginLeft: theme.spacing(1)
  },
  select: {
    flex: '0 1 auto'
  }
}))

const CategoryPicker = ({ className, required, onChange, value }) => {
  const classes = useStyles()
  const [categories = [], status] = usePromise(getCategories, { cacheKey: 'categories' })
  const selections = useMemo(() => {
    return categories.map(cat => {
      const color = stringToColor(cat.label)
      return {
        ...cat,
        color,
        textColor: invertColor(color)
      }
    })
  }, [categories.length, status])
  const selected = useMemo(() => categories.find(cat => cat.id === value) || {}, [categories.length, status])
  let [isNew, setNew] = useState(false)

  const handleChangeSelect = ({ target: { value } }) => {
    if (value === '@@new') {
      setNew(true)
    } else {
      setNew(false)
      onChange(value)
    }
  }

  isNew = isNew || (categories.length === 0 && status === 'success')
  const isLoading = status === 'pending'

  return (
    <div className={`${classes.root} ${className}`}>
      <FormControl variant="outlined" fullWidth required={required} className={classes.select}>
        <Select
          native
          value={isNew ? '@@new' : value}
          onChange={handleChangeSelect}
          input={<OutlinedInput />}
          style={{
            backgroundColor: selected.color || 'initial',
            color: selected.textColor || 'initial'
          }}
        >
          {isLoading && (<option value="" />)}
          {selections.map(cat => (
            <option
              key={`category${cat.id}`}
              value={cat.id}
              style={{
                backgroundColor: cat.color,
                color: cat.textColor
              }}
            >
              {cat.label}
            </option>
          ))}
          <option
            key="@@new"
            value="@@new"
          >
            Add new
          </option>
        </Select>
      </FormControl>
      {isNew && (
        <TextField
          required={required}
          value={value}
          onChange={({ target: { value } }) => onChange(value)}
          className={classes.textInput}
          variant="outlined"
        />
      )}
    </div>
  )
}

CategoryPicker.propTypes = {
  required: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default CategoryPicker
