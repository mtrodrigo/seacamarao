interface CartItem {
  name: string;
  code: string;
  price: number;
  quantity: number;
}

interface UserData {
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

const prepareWhatsAppMessage = (
  cartItems: CartItem[],
  total: string,
  userData: UserData
): string => {
  let message = "🚀 *NOVO PEDIDO* 🚀\n\n";
  
  message += `*CLIENTE:* ${userData.name}\n`;
  message += `*TELEFONE:* ${userData.phone || 'Não informado'}\n`;
  
  if (userData.address || userData.city || userData.state) {
    message += `\n*ENDEREÇO:*\n`;
    message += `${userData.address || ''}`;
    message += `${userData.address && userData.city ? ', ' : ''}`;
    message += `${userData.city || ''}`;
    message += `${(userData.address || userData.city) && userData.state ? ' - ' : ''}`;
    message += `${userData.state || ''}\n`;
  }

  message += `\n*ITENS DO PEDIDO:*\n`;
  cartItems.forEach((item: CartItem) => {
    message += `➡ ${item.name} (Cód: ${item.code})\n`;
    message += `   ${item.quantity}x ${item.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}\n`;
  });

  message += `\n*TOTAL:* ${total}\n`;
  message += `\n📅 ${new Date().toLocaleString("pt-BR")}\n`;
  message += `\nObrigado pela preferência!`;

  return message;
};

export default prepareWhatsAppMessage;