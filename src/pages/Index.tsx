import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Star, 
  Clock, 
  Truck,
  UtensilsCrossed,
  Heart,
  Car
} from 'lucide-react';
import heroImage from '@/assets/hero-food.jpg';
import food1 from '../assets/shroomstruffles.jpg';
import food2 from '../assets/grilled-salmon-recipe-2.jpg';
import food3 from '../assets/delicious-beef-burger-scaled.webp';

const Index = () => {
  // Mock featured items - these would come from API
  const featuredItems = [
    {
      id: '1',
      name: 'Truffle Pasta',
      price: 24.99,
      image: food1,
      rating: 4.8,
      preparationTime: 25,
    },
    {
      id: '2', 
      name: 'Grilled Salmon',
      price: 28.99,
      image: food2,
      rating: 4.9,
      preparationTime: 20,
    },
    {
      id: '3',
      name: 'Wagyu Burger',
      price: 32.99,
      image: food3,
      rating: 4.7,
      preparationTime: 15,
    }
  ];

  const categories = [
    { name: 'Appetizers', icon: '🥗', count: 12 },
    { name: 'Main Courses', icon: '🍽️', count: 25 },
    { name: 'Desserts', icon: '🍰', count: 8 },
    { name: 'Beverages', icon: '🥤', count: 15 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-orange-600">
              Delicious Food
              <span className="block gradient-hero bg-clip-text text-black text-3xl mt-5">
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto text-balance">
              Experience gourmet dining from the comfort of your home. 
              Fresh ingredients, expert chefs, lightning-fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-orange-600 text-black hover:bg-orange-700" asChild>
                <Link to="/menu">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-black" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30min</div>
              <div className="text-muted-foreground">Avg Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">60+</div>
              <div className="text-muted-foreground">Menu Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked by our chefs, these signature dishes represent the best of our kitchen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
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
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${item.price}
                    </span>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.preparationTime} mins
                    </div>
                  </div>
                  <Button className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/menu">
                View Full Menu
                <UtensilsCrossed className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our diverse menu categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="text-center p-6 hover:shadow-warm transition-smooth group-hover:scale-105">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} items
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers who trust FlavorDrive for their food delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/menu">
                <Truck className="mr-2 h-5 w-5" />
                Start Ordering
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 text-black bg-white hover:bg-black hover:text-white" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
