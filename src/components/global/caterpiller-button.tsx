import { Button } from "../ui/button";

const CaterpillerButton = () => {
  const handleLogin = () => {
    const url = import.meta.env.VITE_CATERP_URL;
    window.open(url, "_blank");
  };

  return (
    <Button className="float-right" onClick={handleLogin}>
      Login to Caterpillar
    </Button>
  );
};

export default CaterpillerButton;
