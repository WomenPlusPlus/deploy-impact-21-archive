import React, { useContext } from "react";

import Switch from "react-switch";
import { IoMdSunny, IoMdMoon } from "react-icons/all";

import { ThemeContext } from "../themes/Provider";

const getStyles = (mode) => ({
  switch: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  }
});

const ThemeSwitch = () => {
  const { setTheme, mode } = useContext(ThemeContext);
  const styles = getStyles(mode);
  return (
    <Switch
      checked={mode === "light" ? true : false}
      offColor="#1d1f2f"
      onColor="#FDB813"
      checkedIcon={
        <IoMdSunny style={styles.switch} color="white" className="light" />
      }
      uncheckedIcon={
        <IoMdMoon style={styles.switch} color="white" className="dark" />
      }
      onChange={setTheme}
    />
  );
};

export default ThemeSwitch;