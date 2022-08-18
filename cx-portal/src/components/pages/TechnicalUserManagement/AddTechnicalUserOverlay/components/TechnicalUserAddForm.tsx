import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { Controller } from 'react-hook-form'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { AppRole, useFetchAppRolesQuery } from 'features/admin/appuserApiSlice'

const TechnicalUserAddFormSelect = ({
  control,
  trigger,
  errors,
  name,
  rules,
}: any) => {
  const { t } = useTranslation()
  const roles = useFetchAppRolesQuery(
    '5cf74ef8-e0b7-4984-a872-474828beb5d8'
  ).data

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
            {t('content.addUser.technicalUser.addOverlay.service')}
          </InputLabel>
          <Select
            error={!!errors[name]}
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            value={value}
            variant="filled"
            fullWidth
            sx={{
              color: value === 'none' ? 'gray' : '',
            }}
          >
            <MenuItem disabled value="none">
              {t('global.actions.pleaseSelect')}
            </MenuItem>
            {roles?.map((role: AppRole) => (
              <MenuItem key={role.roleId} value={role.roleId}>
                {role.role}
              </MenuItem>
            ))}
          </Select>
          {!!errors[name] && (
            <FormHelperText
              sx={{ marginBottom: '23px', color: 'danger.danger' }}
            >
              {t('content.addUser.technicalUser.addOverlay.error.select')}
            </FormHelperText>
          )}
        </>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  )
}

const TechnicalUserAddFormTextfield = ({
  control,
  trigger,
  errors,
  helperText,
  label,
  placeholder,
  name,
  rules,
  limit = 80,
}: any) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
            {label}
          </InputLabel>
          <TextField
            error={!!errors[name]}
            fullWidth
            helperText={
              !!errors[name] ? helperText : `${value.length}/${limit}`
            }
            inputProps={{
              maxLength: limit,
            }}
            multiline
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            placeholder={placeholder}
            value={value}
            variant="filled"
            FormHelperTextProps={{
              sx: { marginLeft: !!errors[name] ? '' : 'auto' },
            }}
            InputProps={{
              endAdornment: !!errors[name] && (
                <InputAdornment sx={{ color: 'danger.danger' }} position="end">
                  <ErrorOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  )
}

export const TechnicalUserAddForm = ({
  control,
  errors,
  handleSubmit,
  trigger,
}: any) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ marginBottom: '23px' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <TechnicalUserAddFormTextfield
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserName',
              rules: {
                required: true,
              },
              placeholder: t(
                'content.addUser.technicalUser.addOverlay.username'
              ),
              label: t('content.addUser.technicalUser.addOverlay.username'),
              helperText: t(
                'content.addUser.technicalUser.addOverlay.error.description'
              ),
            }}
          />
        </div>
        <div className="form-input">
          <TechnicalUserAddFormTextfield
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserDescription',
              rules: {
                required: true,
              },
              placeholder: t(
                'content.addUser.technicalUser.addOverlay.description'
              ),
              label: t('content.addUser.technicalUser.addOverlay.description'),
              helperText: t(
                'content.addUser.technicalUser.addOverlay.error.description'
              ),
              limit: 120,
            }}
          />
        </div>
        <div className="form-input">
          <TechnicalUserAddFormSelect
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserService',
              rules: {
                required: true,
                validate: (value: string) => value !== 'none',
              },
            }}
          />
        </div>
      </form>
    </Box>
  )
}
