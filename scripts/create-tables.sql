-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_am VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    description TEXT,
    description_am TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_address TEXT NOT NULL,
    products JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Insert sample products
INSERT INTO products (name, name_am, category, price, image_url, description, description_am, in_stock) VALUES
('Royal Majlis Set', 'ንጉሣዊ መጅሊስ ስብስብ', 'majlis', 125000, '/placeholder.svg?height=400&width=600', 'Luxurious traditional Arabian majlis with gold accents and premium fabrics.', 'በወርቅ ማስዋቢያዎች እና ከፍተኛ ጥራት ያላቸው ጨርቆች የተሰራ ቅንጦተኛ ባህላዊ የአረብ መጅሊስ።', true),
('Golden Sofa Collection', 'የወርቅ ሶፋ ስብስብ', 'sofas', 85000, '/placeholder.svg?height=400&width=600', 'Elegant sofa set with golden embroidery and comfortable seating.', 'በወርቅ ጥልፍ እና ምቹ መቀመጫ የተሰራ ውብ ሶፋ ስብስብ።', true),
('Palace Bedroom Set', 'የቤተ መንግስት የመኝታ ክፍል ስብስብ', 'beds', 95000, '/placeholder.svg?height=400&width=600', 'Majestic bedroom furniture fit for royalty with intricate carvings.', 'ውስብስብ ቅርጻ ቅርጾች ያሉት ለንጉሣዊነት የሚመጥን ግርማ ሞገስ ያለው የመኝታ ክፍል እቃ።', true),
('Silk Curtain Collection', 'የሐር መጋረጃ ስብስብ', 'curtains', 35000, '/placeholder.svg?height=400&width=600', 'Premium silk curtains with traditional Arabian patterns.', 'ባህላዊ የአረብ ንድፎች ያሉት ከፍተኛ ጥራት ያለው የሐር መጋረጃ።', true);
