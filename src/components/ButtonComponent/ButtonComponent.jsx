import { Button } from 'antd'

const ButtonComponent = ({ className, size, styleButton, styleTextButton, textbutton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            {...rests}
            className={className}
        >
            <span style={styleTextButton}>{textbutton}</span>
        </Button>
    )
}

export default ButtonComponent