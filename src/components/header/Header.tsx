import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.png";
import logo_text from "../../assets/logo_text.png";
import { HeaderBottom } from "../buttons/HeaderBottom";
import { CartContext } from "../../contexts/CartContext";
import { Context } from "../../contexts/UserContext";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartAmount, cart, total } = useContext(CartContext);
  const { authenticated, logout } = useContext(Context);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleCart = (open: boolean) => () => {
    setIsCartOpen(open);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#27272a", boxShadow: 4 }}>
      <Toolbar
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: 1152,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <img
              src={logo}
              alt="Logo Sea Camarão"
              className="max-w-10 sm:max-w-20"
            />
            <img
              src={logo_text}
              alt="Texto Logo"
              className="max-w-40 sm:max-w-48"
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <HeaderBottom to="/" text="Produtos" />
            <HeaderBottom to="/about" text="Sobre" />
            {authenticated ? (
              <HeaderBottom to="#" onClick={logout} text="Sair" />
            ) : (
              <HeaderBottom to="/login" text="Login" />
            )}
            <IconButton
              color="inherit"
              aria-label="carrinho de compras"
              onClick={toggleCart(true)}
            >
              <Badge badgeContent={cartAmount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box
            sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#1e293b",
                  color: "white",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>{}</MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <HeaderBottom to="/" text="Produtos" />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <HeaderBottom to="/about" text="Sobre" />
              </MenuItem>
              <MenuItem>
                {authenticated ? (
                  <HeaderBottom to="#" onClick={logout} text="Sair" />
                ) : (
                  <HeaderBottom to="/login" text="Login" />
                )}
              </MenuItem>
            </Menu>
            <IconButton
              color="inherit"
              aria-label="carrinho de compras"
              onClick={toggleCart(true)}
            >
              <Badge badgeContent={cartAmount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={toggleCart(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1e293b",
            color: "white",
            width: 400,
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          {cartAmount === 0 ? (
            <>
              <p className="my-8">Carrinho vazio</p>
              <HeaderBottom
                to="#"
                text="Continuar comprando"
                onClick={toggleCart(false)}
              />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Carrinho de Compras
              </Typography>
              {cart.map((item) => (
                <Typography key={item.id}>
                  {item.quantity}un - {item.name} -{" "}
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
              ))}
              <Typography sx={{ marginBlock: 3 }}>TOTAL: {total}</Typography>
              <HeaderBottom
                to="/cart"
                onClick={toggleCart(false)}
                text="Finalizar compra"
              />
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};
