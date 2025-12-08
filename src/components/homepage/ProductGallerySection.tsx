import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Shirt,
  Home,
  Sparkles,
  Smartphone,
  ChevronRight,
} from "lucide-react";

const productCategories = [
  {
    id: "health",
    name: "Health",
    description: "Supplements • Wellness • Fitness",
    icon: Heart,
  },
  {
    id: "groceries",
    name: "Groceries",
    description: "Food • Beverages • Essentials",
    icon: ShoppingCart,
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Clothing • Shoes • Accessories",
    icon: Shirt,
  },
  {
    id: "home",
    name: "Home",
    description: "Furniture • Decor • Appliances",
    icon: Home,
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Skincare • Haircare • Baby Care",
    icon: Sparkles,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Phones • Laptops • Gadgets",
    icon: Smartphone,
  },
];

const ProductGallerySection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Sell Across Multiple Categories
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Expand your reach by listing products in our most popular categories
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {productCategories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.id}
                className="group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 text-sm">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-1">
                    {category.description}
                  </p>

                  {/* View Link */}
                  {/* <div className="flex items-center text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View details
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't see your category?{" "}
            <button className="text-primary hover:text-primary/80 font-medium">
              Contact us →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGallerySection;