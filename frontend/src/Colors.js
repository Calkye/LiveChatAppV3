const Colors = [
  {SideBarBackground: "#2F416E"},
  {MainAppBackground: "#9BB2FF"}, 
  {MainButtonBackground: "#506495"}, 
  {MainBorderColor: "#3F76BC"}, 
  {PrimaryTextColor: "#9FAAC5"},
  {InputPrimaryColor: "#7287C5"},
  {SecondaryTextColor: "#B2BDDF"},
  {SecondaryButtonColor: "#3C69F0"}
];

Colors.forEach(color => {
  const name = Object.keys(color)[0];
  const value = color[name];
  document.documentElement.style.setProperty(`--${name}`, value);
  console.log(`--${name} set to ${value}`); // Add this line to confirm the variables are being set
});
