import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign In With GOOGLE
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
