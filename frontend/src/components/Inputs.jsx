import React, { useState } from 'react'
import { inputStyles as styles } from '../assets/dummystyle'
import { EyeOff, Eye } from 'lucide-react'

const Inputs = ({
    value,
    onChange,
    label,
    placeHolder,
    type = 'text'
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputContainer(isFocused)}>
            <input type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
            className={styles.inputField}
            value={value} 
            onChange={onChange} 
            placeholder={placeHolder} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
            />
            {type === 'password' && (
                <button type='button' onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleButton}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    </div>
  )
}

export default Inputs