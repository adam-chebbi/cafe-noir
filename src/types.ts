export type MenuCategory = 
  | 'espresso'
  | 'slow-brew'
  | 'chilled'
  | 'bakery'
  | 'beans'
  | string;

export interface ApiParameterOption {
  id: string;
  name: string;
  priceDelta: number;
}

export interface ApiParameterGroup {
  id: string;
  name: string;
  description?: string;
  selectionType: 'single' | 'multi' | 'quantity';
  isRequired: boolean;
  minSelections?: number;
  maxSelections?: number;
  options: ApiParameterOption[];
}

export interface ApiMenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  photo?: string;
  price: number;
  availability: 'disponible' | 'indisponible' | 'masque';
  allergens: string[];
  unit: string;
  isFeatured: boolean;
  parameterGroups: ApiParameterGroup[];
}

export interface PublicMenuResponse {
  establishmentName: string;
  currency: string;
  address?: string;
  phone?: string;
  wifiPassword?: string;
  openingHours?: string;
  categories: { id: string; name: string; displayOrder: number }[];
  products: ApiMenuItem[];
}

export interface SelectedOption {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceDelta: number;
}

export interface WebCartItem {
  cartItemId: string;
  product: ApiMenuItem;
  selectedOptions: SelectedOption[];
  customerNote?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderSubmitPayload {
  tableNumber: string;
  tableToken?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    selectedOptionIds?: string[];
    selectedParameters?: { groupId: string; optionId: string }[];
    variantName?: string;
    supplementNames?: string[];
    customerNote?: string;
  }[];
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  consumptionType?: string;
}

export interface OrderSubmitResponse {
  success: boolean;
  orderId: string;
  orderNumber: string;
  tableNumber: string;
  totalAmount: number;
  status: string;
  message: string;
}

export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  category: string;
  tags?: string[];
  imageUrl?: string;
  photo?: string;
  roastLevel?: 'Light' | 'Medium' | 'Dark' | 'Omni-Roast';
  origins?: string;
  elevation?: string;
  process?: string;
  tastingNotes?: string[];
  calories?: number;
  popular?: boolean;
  seasonal?: boolean;
  availability?: string;
  allergens?: string[];
  unit?: string;
  parameterGroups?: ApiParameterGroup[];
  availableSizes?: { name: string; ounces: string; priceDelta: number }[];
  milkOptions?: string[];
  temperatureOptions?: ('Hot' | 'Iced')[];
  syrupOptions?: { name: string; priceDelta: number }[];
}

export interface CustomizationOptions {
  size: string;
  sizePriceDelta: number;
  temperature: 'Hot' | 'Iced';
  milk: string;
  milkPriceDelta: number;
  syrup: string;
  syrupPriceDelta: number;
  extraShots: number;
  iceLevel: 'Normal Ice' | 'Less Ice' | 'Extra Ice' | 'No Ice';
  sweetness: '100% (Standard)' | '75%' | '50%' | '25%' | 'Unsweetened';
  specialInstructions: string;
  grindType?: 'Whole Bean' | 'French Press' | 'Pour Over / Drip' | 'Espresso' | 'Aeropress';
  selectedOptions?: SelectedOption[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  customization: CustomizationOptions;
  unitPrice: number;
  quantity: number;
  selectedOptions?: SelectedOption[];
  customerNote?: string;
  totalPrice?: number;
}

export interface TableReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Indoor Sunlit Bar' | 'Garden Terrace' | 'Quiet Study Nook' | 'Main Cafe Roastery';
  specialRequest?: string;
  createdAt: string;
}

export interface CoffeeQuizStep {
  id: string;
  title: string;
  question: string;
  options: {
    label: string;
    description: string;
    iconName: string;
    flavorKey: string;
  }[];
}

