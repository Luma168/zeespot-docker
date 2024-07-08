import { Button } from "@mui/material";

const FormButton = ({ onClick, children }) => {
    return(
        <Button
            variant="outlined"
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export { FormButton };    