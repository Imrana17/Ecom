import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { 
  Search, 
  Star, 
  Clock, 
  Plus,
  Heart,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import food1 from '../assets/shroomstruffles.jpg';
import food2 from '../assets/grilled-salmon-recipe-2.jpg';
import food3 from '../assets/delicious-beef-burger-scaled.webp';
import food4 from '../assets/Avocado-Caesar-Salad-FI.jpg';
import food5 from '../assets/chocolate-molten-lava-cakes.jpg';
import food6 from '../assets/fruit-smoothie-resize-8.jpg';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  // Mock data - would come from API
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Truffle Mushroom Pasta',
      description: 'Fresh pasta with truffle oil, wild mushrooms, and parmesan cheese',
      price: 24.99,
      category: 'mains',
      image: food1,
      rating: 4.8,
      preparationTime: 25,
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Grilled Atlantic Salmon',
      description: 'Fresh salmon fillet with herb butter and seasonal vegetables',
      price: 28.99,
      category: 'mains',
      image: food2,
      rating: 4.9,
      preparationTime: 20,
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Wagyu Beef Burger',
      description: 'Premium wagyu beef patty with aged cheddar and truffle fries',
      price: 32.99,
      category: 'mains',
      image: food3,
      rating: 4.7,
      preparationTime: 15,
      isAvailable: true,
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce, parmesan, croutons, and house caesar dressing',
      price: 14.99,
      category: 'appetizers',
      image: food4,
      rating: 4.6,
      preparationTime: 10,
      isAvailable: true,
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 9.99,
      category: 'desserts',
      image: food5,
      rating: 4.9,
      preparationTime: 12,
      isAvailable: true,
    },
    {
      id: '6',
      name: 'Fresh Fruit Smoothie',
      description: 'Blend of seasonal fruits with yogurt and honey',
      price: 7.99,
      category: 'beverages',
      image: food6,
      rating: 4.5,
      preparationTime: 5,
      isAvailable: true,
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-warm transition-smooth group">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
                <Badge className="absolute top-3 right-3 bg-primary/90">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {item.rating}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 left-3 bg-white/90 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.preparationTime} mins
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.isAvailable}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your search criteria.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;