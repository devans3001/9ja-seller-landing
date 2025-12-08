import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Shirt,
  Home,
  Sparkles,
  Smartphone,
} from "lucide-react";

const productCategories = [
  {
    id: "health",
    name: "Health",
    description: "Food supplements • Wellness products • Fitness equipment",
    icon: Heart,
    color: "from-green-500/20 to-green-600/20",
  },
  {
    id: "groceries",
    name: "Groceries",
    description: "Food • Beverages • Daily essentials",
    icon: ShoppingCart,
    color: "from-orange-500/20 to-orange-600/20",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing • Shoes • Accessories",
    icon: Shirt,
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    id: "home",
    name: "Home Essentials",
    description: "Furniture • Decor • Home appliances",
    icon: Home,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "beauty",
    name: "Beauty & Baby Products",
    description: "Skincare & makeup • Haircare • Baby care & essentials",
    icon: Sparkles,
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    id: "gadgets",
    name: "Gadgets & Electronics",
    description:
      "Smartphones • Laptops • Smartwatches & luxury timepieces • Gaming consoles & accessories • Other tech gadgets",
    icon: Smartphone,
    color: "from-cyan-500/20 to-cyan-600/20",
  },
];

const ProductGallerySection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Product Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Sell Across <span className="text-primary">All Categories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From electronics to fashion, reach customers in every product
              category with our comprehensive BNPL platform
            </p>
          </motion.div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {productCategories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.id}
                className="group cursor-pointer h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20 h-full flex flex-col">
                  {/* Category image placeholder */}
                  <div className="mb-4">
                    <div
                      className={`aspect-square bg-gradient-to-br ${category.color} rounded-lg border border-primary/20 flex items-center justify-center relative overflow-hidden`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary)_1px,transparent_1px)] bg-[length:10px_10px]" />
                      </div>

                      {/* Icon */}
                      <div className="relative z-10">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>

                      {/* Hover shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-xs text-muted-foreground flex-1 flex items-center justify-center">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGallerySection;
