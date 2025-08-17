import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Award, 
  Leaf, 
  Heart, 
  Shield,
  Star,
  ArrowRight
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Quality First",
      description: "We source only the finest ingredients and work with expert chefs to create exceptional dishes."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Fast Delivery",
      description: "Your time is valuable. We guarantee fresh, hot food delivered quickly to your doorstep."
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainable",
      description: "We're committed to sustainable practices, from eco-friendly packaging to local sourcing."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Food Safety",
      description: "Strict hygiene standards and temperature-controlled delivery ensure your food is always safe."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "500+", label: "Daily Orders" },
    { number: "4.9", label: "Average Rating", icon: "⭐" },
    { number: "25min", label: "Avg Delivery Time" }
  ];

  const team = [
    {
      name: "Maria Rodriguez",
      role: "Head Chef",
      experience: "15+ years",
      specialty: "Mediterranean Cuisine"
    },
    {
      name: "James Chen",
      role: "Pastry Chef",
      experience: "12+ years",
      specialty: "French Pastries"
    },
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      experience: "8+ years",
      specialty: "Logistics & Quality"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About FlavorDrive
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Passionate about delivering exceptional culinary experiences right to your doorstep. 
            Founded in 2020, we've been revolutionizing food delivery with quality, speed, and care.
          </p>
          <Button size="lg" asChild>
            <Link to="/menu">
              Explore Our Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center">
                  {stat.icon && <span className="mr-2">{stat.icon}</span>}
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to becoming your trusted food delivery partner
            </p>
          </div>

          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p>
              FlavorDrive was born from a simple idea: everyone deserves access to restaurant-quality food, 
              no matter where they are. Founded by food enthusiasts who believed that great taste shouldn't 
              be compromised by convenience, we set out to bridge the gap between exceptional dining and 
              modern life's demands.
            </p>
            <p>
              What started as a small team with big dreams has grown into a trusted network of culinary 
              professionals, delivery experts, and customer service specialists. We've partnered with 
              local restaurants and talented chefs to bring you a diverse menu that celebrates flavors 
              from around the world.
            </p>
            <p>
              Today, we're proud to serve thousands of customers daily, but our mission remains the same: 
              to deliver not just food, but experiences that bring joy to your table.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-warm transition-smooth">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The talented professionals behind your favorite dishes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                  <p className="text-muted-foreground text-sm mb-1">{member.experience}</p>
                  <p className="text-muted-foreground text-sm">Specialty: {member.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Recognition & Awards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Best Food Delivery 2023</h3>
              <p className="text-muted-foreground text-sm">City Food Awards</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Top Customer Service</h3>
              <p className="text-muted-foreground text-sm">Local Business Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-semibold mb-2">People's Choice</h3>
              <p className="text-muted-foreground text-sm">Community Food Festival</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience FlavorDrive?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers and discover why we're the preferred choice for food delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/menu">Order Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;