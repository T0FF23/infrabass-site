import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, Star, Music, Zap, Home, User, Grid, List } from 'lucide-react';

const VinylSkateShop = () => {
  // Ajouter le style pour cacher TOUTES les scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  // Charger l'API YouTube IFrame
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onload = () => {
        console.log('✅ API YouTube IFrame chargée avec succès');
      };
      script.onerror = (error) => {
        console.warn('⚠️ API YouTube non disponible (bloquée par CSP ou réseau). Les lecteurs audio ne fonctionneront pas.');
        // Ne pas bloquer l'application, juste désactiver silencieusement les lecteurs
      };
      
      // Vérifier si le script peut être ajouté (certains environnements comme Claude.ai bloquent)
      try {
        document.body.appendChild(script);
        console.log('📡 Chargement de l\'API YouTube IFrame...');
      } catch (e) {
        console.warn('⚠️ Impossible de charger l\'API YouTube dans cet environnement');
      }
    } else {
      console.log('✅ API YouTube déjà chargée');
    }
  }, []);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [vinylBannerImage, setVinylBannerImage] = useState('/infrabass-site/images/Bandeau_infraBASS_VINYLS.png');
  const [vinylBannerImageYellow, setVinylBannerImageYellow] = useState('/infrabass-site/images/Bandeau_infraBASS_VINYLS_jaune.png');
  const [vinylButtonImage, setVinylButtonImage] = useState('/infrabass-site/images/Tete_infrabass.png');
  const [vinylButtonImageYellow, setVinylButtonImageYellow] = useState('/infrabass-site/images/Tete_infrabass_survol-clic.png');
  const [skateboardBannerImage, setSkateboardBannerImage] = useState('/infrabass-site/images/Bandeau_infraSK8.png');
  const [skateboardBannerImageYellow, setSkateboardBannerImageYellow] = useState('/infrabass-site/images/Bandeau_infraSK8_SURVOL.png');
  const [skateboardButtonImage, setSkateboardButtonImage] = useState('/infrabass-site/images/Tete_elephant.png');
  const [skateboardButtonImageYellow, setSkateboardButtonImageYellow] = useState('/infrabass-site/images/Tete_elephant_SURVOL.png');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productGenre, setProductGenre] = useState('');
  const [productType, setProductType] = useState('');
  const [productCategory, setProductCategory] = useState('vinyl');
  const [productAudioUrl, setProductAudioUrl] = useState('');
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });
  const [products, setProducts] = useState({
    vinyls: [
      {
        id: 1,
        name: "Daft Punk - Random Access Memories",
        price: 35.99,
        stock: 25,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Columbia",
        format: "2xLP",
        country: "France",
        released: "2013",
        style: "Disco, Synth-pop",
        audioUrl: "",
        audioUrl2: ""
      },
      {
        id: 2,
        name: "Aphex Twin - Selected Ambient Works 85-92",
        price: 29.99,
        stock: 15,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Apollo",
        format: "2xLP",
        country: "UK",
        released: "1992",
        style: "Ambient, IDM",
        audioUrl: "",
        audioUrl2: ""
      },
      {
        id: 3,
        name: "Burial - Untrue",
        price: 27.50,
        stock: 8,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Hyperdub",
        format: "2xLP",
        country: "UK",
        released: "2007",
        style: "Dubstep, UK Garage",
        audioUrl: "",
        audioUrl2: ""
      },
      {
        id: 4,
        name: "Kraftwerk - Trans-Europe Express",
        price: 32.00,
        stock: 12,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Kling Klang",
        format: "LP",
        country: "Germany",
        released: "1977",
        style: "Electro, Synth-pop",
        audioUrl: "",
        audioUrl2: ""
      },
      {
        id: 5,
        name: "Boards of Canada - Music Has the Right to Children",
        price: 31.00,
        stock: 0,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Warp",
        format: "2xLP",
        country: "UK",
        released: "1998",
        style: "IDM, Ambient",
        audioUrl: "",
        audioUrl2: ""
      },
      {
        id: 6,
        name: "Massive Attack - Mezzanine",
        price: 28.99,
        stock: 18,
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: null,
        image2: null,
        genre: "Electronic",
        label: "Virgin",
        format: "2xLP",
        country: "UK",
        released: "1998",
        style: "Trip Hop, Downtempo",
        audioUrl: "",
        audioUrl2: ""
      }
    ]
  });

  // Products managed in memory

  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductValidated, setIsProductValidated] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const vinylProducts = products.vinyls;

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, qty: item.qty + 1} : item
      ));
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? {...item, qty: newQty} : item
      ));
    }
  };

  const handleOrder = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!paymentData.name || !paymentData.email || !paymentData.cardNumber) {
      console.log('ℹ️', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setShowPaymentForm(false);
    setShowOrderConfirm(true);
    setTimeout(() => {
      setCart([]);
      setShowOrderConfirm(false);
      setCartOpen(false);
      setPaymentData({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
      });
    }, 3000);
  };

  const loginToAdmin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentPage('admin');
      setUsername('');
      setPassword('');
    } else {
      console.log('ℹ️', 'Identifiants incorrects!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin'); // Supprimer la session
    setCurrentPage('home');
  };

  const deleteProduct = (id, category) => {
    const confirmed = true;
    if (!confirmed) return;

    setProducts({
      ...products,
      vinyls: products.vinyls.filter(p => p.id !== id)
    });
    console.log('ℹ️', 'Produit supprimé avec succès !');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Moteur de recherche avancé qui fouille dans tous les champs
  const searchInProduct = (product, term) => {
    if (!term) return true;
    
    const searchLower = term.toLowerCase();
    
    // Liste de tous les champs à fouiller
    const fieldsToSearch = [
      product.name,
      product.genre,
      product.type,
      product.label,
      product.format,
      product.country,
      product.released,
      product.style,
      product.price?.toString(),
      product.stock?.toString(),
      product.category
    ];
    
    // Vérifier si le terme de recherche est présent dans au moins un champ
    return fieldsToSearch.some(field => 
      field && field.toString().toLowerCase().includes(searchLower)
    );
  };

  const filteredVinyls = vinylProducts.filter(p => searchInProduct(p, searchTerm));

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-white mb-8">Contactez-nous</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Informations</h3>
          <div className="space-y-4 text-gray-300">
            <p><strong className="text-yellow-400">Email:</strong> contact@infrabass.com</p>
            <p><strong className="text-yellow-400">Téléphone:</strong> +33 1 23 45 67 89</p>
            <p><strong className="text-yellow-400">Adresse:</strong> 123 Rue de la Musique, 75001 Paris</p>
            <p><strong className="text-yellow-400">Horaires:</strong> Lun-Sam 10h-19h</p>
          </div>
        </div>

        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Envoyez un message</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
            <textarea
              placeholder="Votre message"
              rows="4"
              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            ></textarea>
            <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const InfoPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-white mb-8">Informations</h2>
      
      <div className="space-y-6">
        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">À propos de nous</h3>
          <p className="text-gray-300 leading-relaxed">
            INFRABASS est né de la passion pour deux cultures iconiques : la musique vinyl et le skateboard. 
            Depuis 2020, nous proposons une sélection pointue de disques vinyls collectors et de skateboards premium 
            pour les passionnés et les connaisseurs.
          </p>
        </div>

        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Livraison</h3>
          <p className="text-gray-300 leading-relaxed mb-2">
            • Livraison gratuite dès 50€ d'achat<br/>
            • Expédition sous 24-48h<br/>
            • Suivi de colis en temps réel<br/>
            • Emballage soigné et sécurisé
          </p>
        </div>

        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Retours et garanties</h3>
          <p className="text-gray-300 leading-relaxed">
            • 30 jours pour changer d'avis<br/>
            • Garantie constructeur sur tous les skateboards<br/>
            • Vinyls testés avant expédition<br/>
            • Service client disponible 7j/7
          </p>
        </div>

        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Paiement sécurisé</h3>
          <p className="text-gray-300 leading-relaxed">
            Tous vos paiements sont sécurisés via SSL. Nous acceptons les cartes bancaires, 
            PayPal et les virements bancaires.
          </p>
        </div>
      </div>
    </div>
  );

  const AdminLoginPage = () => {
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');

    const handleLogin = () => {
      const u = localUsername.trim();
      const p = localPassword.trim();
      
      console.log('Username saisi:', u);
      console.log('Password saisi:', p);
      
      if (u === 'admin' && p === 'admin123') {
        console.log('ℹ️', 'Connexion réussie !');
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true'); // Sauvegarder la session
        setCurrentPage('admin');
        setLocalUsername('');
        setLocalPassword('');
      } else {
        console.log('ℹ️', 'Erreur : Username doit être "admin" et Password "admin123"');
      }
    };

    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-gray-900 rounded-xl p-8 border border-yellow-500">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Connexion Admin</h2>
          <div>
            <div className="mb-4">
              <label className="block text-white mb-2 font-bold">Username</label>
              <input
                type="text"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-white text-black rounded-lg text-lg"
                placeholder="Tapez: admin"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white mb-2 font-bold">Password</label>
              <input
                type="password"
                value={localPassword}
                onChange={(e) => setLocalPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-white text-black rounded-lg text-lg"
                placeholder="Tapez: admin123"
              />
            </div>
            <button 
              onClick={handleLogin}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg text-lg cursor-pointer"
            >
              SE CONNECTER
            </button>
          </div>
          <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500">
            <p className="text-white text-center font-bold">
              🔐 Identifiants de test :
            </p>
            <p className="text-yellow-400 text-center mt-2 text-lg">
              admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  };

  const AdminPage = () => {
    const [localName, setLocalName] = useState(() => localStorage.getItem('productName') || '');
    const [localPrice, setLocalPrice] = useState(() => localStorage.getItem('productPrice') || '');
    const [localStock, setLocalStock] = useState(() => localStorage.getItem('productStock') || '');
    const [localGenre, setLocalGenre] = useState(() => localStorage.getItem('productGenre') || '');
    const [localType, setLocalType] = useState(() => localStorage.getItem('productType') || '');
    const [localCategory, setLocalCategory] = useState(() => localStorage.getItem('productCategory') || 'vinyl');
    const [localAudioUrl, setLocalAudioUrl] = useState(() => localStorage.getItem('productAudioUrl') || '');
    const [localAudioUrl2, setLocalAudioUrl2] = useState(() => localStorage.getItem('productAudioUrl2') || '');
    const [localLabel, setLocalLabel] = useState(() => localStorage.getItem('productLabel') || '');
    const [localFormat, setLocalFormat] = useState(() => localStorage.getItem('productFormat') || '');
    const [localCountry, setLocalCountry] = useState(() => localStorage.getItem('productCountry') || '');
    const [localReleased, setLocalReleased] = useState(() => localStorage.getItem('productReleased') || '');
    const [localStyle, setLocalStyle] = useState(() => localStorage.getItem('productStyle') || '');
    const [localImage1, setLocalImage1] = useState(() => localStorage.getItem('productImage1') || '');
    const [localImage2, setLocalImage2] = useState(() => localStorage.getItem('productImage2') || '');

    // États locaux pour le formulaire de modification
    const [editLocalName, setEditLocalName] = useState(() => localStorage.getItem('editProductName') || '');
    const [editLocalLabel, setEditLocalLabel] = useState(() => localStorage.getItem('editProductLabel') || '');
    const [editLocalGenre, setEditLocalGenre] = useState(() => localStorage.getItem('editProductGenre') || '');
    const [editLocalStyle, setEditLocalStyle] = useState(() => localStorage.getItem('editProductStyle') || '');
    const [editLocalFormat, setEditLocalFormat] = useState(() => localStorage.getItem('editProductFormat') || '');
    const [editLocalCountry, setEditLocalCountry] = useState(() => localStorage.getItem('editProductCountry') || '');
    const [editLocalReleased, setEditLocalReleased] = useState(() => localStorage.getItem('editProductReleased') || '');
    const [editLocalPrice, setEditLocalPrice] = useState(() => localStorage.getItem('editProductPrice') || '');
    const [editLocalStock, setEditLocalStock] = useState(() => localStorage.getItem('editProductStock') || '');
    const [editLocalAudioUrl, setEditLocalAudioUrl] = useState(() => localStorage.getItem('editProductAudioUrl') || '');
    const [editLocalAudioUrl2, setEditLocalAudioUrl2] = useState(() => localStorage.getItem('editProductAudioUrl2') || '');
    const [editLocalImage1, setEditLocalImage1] = useState(() => localStorage.getItem('editProductImage1') || '');
    const [editLocalImage2, setEditLocalImage2] = useState(() => localStorage.getItem('editProductImage2') || '');
    
    // Charger les valeurs du produit en édition dans les états locaux
    React.useEffect(() => {
      if (editingProduct) {
        setEditLocalName(editingProduct.name || '');
        setEditLocalLabel(editingProduct.label || '');
        setEditLocalGenre(editingProduct.genre || '');
        setEditLocalStyle(editingProduct.style || '');
        setEditLocalFormat(editingProduct.format || '');
        setEditLocalCountry(editingProduct.country || '');
        setEditLocalReleased(editingProduct.released || '');
        setEditLocalPrice(editingProduct.price?.toString() || '');
        setEditLocalStock(editingProduct.stock?.toString() || '');
        setEditLocalAudioUrl(editingProduct.audioUrl || '');
        setEditLocalAudioUrl2(editingProduct.audioUrl2 || '');
        setEditLocalImage1(editingProduct.image1 || '');
        setEditLocalImage2(editingProduct.image2 || '');
      }
    }, [editingProduct]);

    const handleDeleteProduct = (id, category) => {
      console.log('Tentative de suppression:', id, category);
      console.log('Products avant:', products);
      
      const newVinyls = products.vinyls.filter(p => p.id !== id);
      console.log('Nouveaux vinyls:', newVinyls);
      setProducts({
        ...products,
        vinyls: newVinyls
      });
      
      // Réinitialiser le bouton Valider après suppression
      setIsProductValidated(false);
      setIsProductAdded(true);
      
      console.log('ℹ️', 'Produit supprimé avec succès !');
    };

    const handleImageUpload = (e, imageNumber) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (imageNumber === 1) {
            setLocalImage1(reader.result);
            localStorage.setItem('productImage1', reader.result);
          } else {
            setLocalImage2(reader.result);
            localStorage.setItem('productImage2', reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const handleAddProduct = () => {
      if (!localName || !localPrice || !localStock) {
        alert('Veuillez remplir tous les champs obligatoires (Nom, Prix, Stock)');
        return;
      }

      const productToAdd = {
        id: Date.now(),
        name: localName,
        price: parseFloat(localPrice),
        stock: parseInt(localStock),
        rating: 5,
        category: 'vinyl',
        image: '🎵',
        image1: localImage1 || null,
        image2: localImage2 || null,
        genre: localGenre,
        audioUrl: localAudioUrl,
        audioUrl2: localAudioUrl2,
        label: localLabel,
        format: localFormat,
        country: localCountry,
        released: localReleased,
        style: localStyle
      };

      setProducts({
        ...products,
        vinyls: [...products.vinyls, productToAdd]
      });

      console.log('ℹ️', 'Produit ajouté avec succès !');

      // Activer l'état d'ajout et réinitialiser la validation
      setIsProductAdded(true);
      setIsProductValidated(false);

      // Vider les champs et localStorage
      setLocalName('');
      setLocalPrice('');
      setLocalStock('');
      setLocalGenre('');
      setLocalType('');
      setLocalAudioUrl('');
      setLocalAudioUrl2('');
      setLocalLabel('');
      setLocalFormat('');
      setLocalCountry('');
      setLocalReleased('');
      setLocalStyle('');
      setLocalImage1('');
      setLocalImage2('');
      
      localStorage.removeItem('productName');
      localStorage.removeItem('productPrice');
      localStorage.removeItem('productStock');
      localStorage.removeItem('productGenre');
      localStorage.removeItem('productType');
      localStorage.removeItem('productAudioUrl');
      localStorage.removeItem('productAudioUrl2');
      localStorage.removeItem('productLabel');
      localStorage.removeItem('productFormat');
      localStorage.removeItem('productCountry');
      localStorage.removeItem('productReleased');
      localStorage.removeItem('productStyle');
      localStorage.removeItem('productImage1');
      localStorage.removeItem('productImage2');
    };


    return (
      <div className="min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-white">Administration</h2>
            <div className="flex gap-4 items-center">
            </div>
          </div>

          {/* Contenu de l'admin */}
        <>
        {/* Section Images de fond Bandeau Vinyls - Blanc et Jaune côte à côte */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Image de fond blanche */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Vinyls</h3>
            <div className="space-y-3">
              {vinylBannerImage && (
                <div>
                  <img 
                    src={vinylBannerImage} 
                    alt="Bandeau Vinyls" 
                    className="w-full h-32 object-cover rounded-lg border border-yellow-500"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVinylBannerImage(reader.result);
                          localStorage.setItem('vinylBannerImage', reader.result);
                          console.log('ℹ️', 'Image de fond mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setVinylBannerImage('');
                      localStorage.removeItem('vinylBannerImage');
                      console.log('ℹ️', 'Image de fond supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Image de fond jaune */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Vinyls (survol)</h3>
            <div className="space-y-3">
              {vinylBannerImageYellow && (
                <div>
                  <img 
                    src={vinylBannerImageYellow} 
                    alt="Bandeau Vinyls Jaune" 
                    className="w-full h-32 object-cover rounded-lg border border-yellow-500"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVinylBannerImageYellow(reader.result);
                          localStorage.setItem('vinylBannerImageYellow', reader.result);
                          console.log('ℹ️', 'Image de fond JAUNE mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setVinylBannerImageYellow('');
                      localStorage.removeItem('vinylBannerImageYellow');
                      console.log('ℹ️', 'Image de fond JAUNE supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Images du bouton Vinyls - Blanc et Jaune côte à côte */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Image du bouton blanc */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Vinyls : bouton</h3>
            <div className="space-y-3">
              {vinylButtonImage && (
                <div>
                  <img 
                    src={vinylButtonImage} 
                    alt="Bouton Vinyl" 
                    className="w-32 h-32 object-contain rounded-lg border border-yellow-500 bg-gray-800"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVinylButtonImage(reader.result);
                          localStorage.setItem('vinylButtonImage', reader.result);
                          console.log('ℹ️', 'Image du bouton Vinyl mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setVinylButtonImage('');
                      localStorage.removeItem('vinylButtonImage');
                      console.log('ℹ️', 'Image du bouton Vinyl supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Image du bouton jaune */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Vinyls : bouton (survol/clic)</h3>
            <div className="space-y-3">
              {vinylButtonImageYellow && (
                <div>
                  <img 
                    src={vinylButtonImageYellow} 
                    alt="Bouton Vinyl Jaune" 
                    className="w-32 h-32 object-contain rounded-lg border border-yellow-500 bg-gray-800"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVinylButtonImageYellow(reader.result);
                          localStorage.setItem('vinylButtonImageYellow', reader.result);
                          console.log('ℹ️', 'Image du bouton Vinyl JAUNE mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setVinylButtonImageYellow('');
                      localStorage.removeItem('vinylButtonImageYellow');
                      console.log('ℹ️', 'Image du bouton Vinyl JAUNE supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Images de fond Bandeau Skateboards - Blanc et Jaune côte à côte */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Image de fond blanche */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Skateboards</h3>
            <div className="space-y-3">
              {skateboardBannerImage && (
                <div>
                  <img 
                    src={skateboardBannerImage} 
                    alt="Bandeau Skateboards" 
                    className="w-full h-32 object-cover rounded-lg border border-yellow-500"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSkateboardBannerImage(reader.result);
                          localStorage.setItem('skateboardBannerImage', reader.result);
                          console.log('ℹ️', 'Image de fond mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setSkateboardBannerImage('');
                      localStorage.removeItem('skateboardBannerImage');
                      console.log('ℹ️', 'Image de fond supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Image de fond jaune */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Skateboards (survol)</h3>
            <div className="space-y-3">
              {skateboardBannerImageYellow && (
                <div>
                  <img 
                    src={skateboardBannerImageYellow} 
                    alt="Bandeau Skateboards Jaune" 
                    className="w-full h-32 object-cover rounded-lg border border-yellow-500"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSkateboardBannerImageYellow(reader.result);
                          localStorage.setItem('skateboardBannerImageYellow', reader.result);
                          console.log('ℹ️', 'Image de fond JAUNE mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setSkateboardBannerImageYellow('');
                      localStorage.removeItem('skateboardBannerImageYellow');
                      console.log('ℹ️', 'Image de fond JAUNE supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Images du bouton Skateboards - Blanc et Jaune côte à côte */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Image du bouton blanc */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Skateboards : bouton</h3>
            <div className="space-y-3">
              {skateboardButtonImage && (
                <div>
                  <img 
                    src={skateboardButtonImage} 
                    alt="Bouton Skateboard" 
                    className="w-32 h-32 object-contain rounded-lg border border-yellow-500 bg-gray-800"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSkateboardButtonImage(reader.result);
                          localStorage.setItem('skateboardButtonImage', reader.result);
                          console.log('ℹ️', 'Image du bouton mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setSkateboardButtonImage('');
                      localStorage.removeItem('skateboardButtonImage');
                      console.log('ℹ️', 'Image du bouton supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          {/* Image du bouton jaune */}
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Bandeau Skateboards : bouton (survol/clic)</h3>
            <div className="space-y-3">
              {skateboardButtonImageYellow && (
                <div>
                  <img 
                    src={skateboardButtonImageYellow} 
                    alt="Bouton Skateboard Jaune" 
                    className="w-32 h-32 object-contain rounded-lg border border-yellow-500 bg-gray-800"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSkateboardButtonImageYellow(reader.result);
                          localStorage.setItem('skateboardButtonImageYellow', reader.result);
                          console.log('ℹ️', 'Image du bouton Skateboard JAUNE mise à jour avec succès !');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                    Importer
                  </div>
                </label>
                <button
                  onClick={() => {
                    if (true) {
                      setSkateboardButtonImageYellow('');
                      localStorage.removeItem('skateboardButtonImageYellow');
                      console.log('ℹ️', 'Image du bouton Skateboard JAUNE supprimée !');
                    }
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Ajouter un produit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Type de support</label>
              <select
                value={localCategory}
                onChange={(e) => {
                  setLocalCategory(e.target.value);
                  localStorage.setItem('productCategory', e.target.value);
                }}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="vinyl">Vinyl</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Nom *</label>
              <input
                type="text"
                value={localName}
                onChange={(e) => {
                  setLocalName(e.target.value);
                  localStorage.setItem('productName', e.target.value);
                }}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Nom du produit"
              />
            </div>
            {(localCategory === 'vinyl' || localCategory === 'digital') && (
              <>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Label</label>
                  <input
                    type="text"
                    value={localLabel}
                    onChange={(e) => setLocalLabel(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Atlantic Records, Sony..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Artiste(s)</label>
                  <input
                    type="text"
                    value={localGenre}
                    onChange={(e) => setLocalGenre(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Rock, Jazz..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Style</label>
                  <input
                    type="text"
                    value={localStyle}
                    onChange={(e) => setLocalStyle(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Progressive Rock, Blues..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Format</label>
                  <input
                    type="text"
                    value={localFormat}
                    onChange={(e) => setLocalFormat(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="LP, 12&quot;, 33 RPM..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Pays</label>
                  <input
                    type="text"
                    value={localCountry}
                    onChange={(e) => setLocalCountry(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="France, USA, UK..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Released</label>
                  <input
                    type="text"
                    value={localReleased}
                    onChange={(e) => setLocalReleased(e.target.value)}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="1973, 2020..."
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Prix (€) *</label>
              <input
                type="number"
                step="0.01"
                value={localPrice}
                onChange={(e) => setLocalPrice(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="29.99"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Stock *</label>
              <input
                type="number"
                value={localStock}
                onChange={(e) => setLocalStock(e.target.value)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="10"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button
                onClick={handleAddProduct}
                className={`flex-1 py-3 font-bold rounded-lg transition ${
                  isProductAdded 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isProductAdded ? '✓ Produit ajouté' : 'Ajouter le produit'}
              </button>
              <button
                onClick={() => {
                  if (isProductAdded) {
                    setIsProductValidated(true);
                    // Réinitialiser après validation
                    setTimeout(() => {
                      setIsProductValidated(false);
                      setIsProductAdded(false);
                    }, 2000); // 2 secondes pour voir le message de validation
                  }
                }}
                disabled={!isProductAdded}
                className={`flex-1 py-3 font-bold rounded-lg transition ${
                  isProductValidated 
                    ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer' 
                    : isProductAdded
                      ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {isProductValidated ? '✓ Validé' : 'Valider'}
              </button>
            </div>
          </div>
        </div>

        {/* Nouveau bandeau Médias */}
        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Médias</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Colonne 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">URL Audio Face A</label>
                <input
                  type="text"
                  value={localAudioUrl}
                  onChange={(e) => {
                    setLocalAudioUrl(e.target.value);
                    localStorage.setItem('productAudioUrl', e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Le champ input au-dessus permet déjà d'importer l'URL
                      console.log('ℹ️', 'Utilisez le champ ci-dessus pour coller votre URL YouTube');
                    }}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-lg transition"
                  >
                    Importer
                  </button>
                  <button
                    onClick={() => {
                      setLocalAudioUrl('');
                      localStorage.removeItem('productAudioUrl');
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Photo 1</label>
                {localImage1 && (
                  <div className="mb-2">
                    <img src={localImage1} alt="Preview 1" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 1)}
                      className="hidden"
                    />
                    <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                      Importer
                    </div>
                  </label>
                  <button
                    onClick={() => {
                      setLocalImage1('');
                      localStorage.removeItem('productImage1');
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">URL Audio Face B</label>
                <input
                  type="text"
                  value={localAudioUrl2}
                  onChange={(e) => {
                    setLocalAudioUrl2(e.target.value);
                    localStorage.setItem('productAudioUrl2', e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Le champ input au-dessus permet déjà d'importer l'URL
                      console.log('ℹ️', 'Utilisez le champ ci-dessus pour coller votre URL YouTube');
                    }}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-lg transition"
                  >
                    Importer
                  </button>
                  <button
                    onClick={() => {
                      setLocalAudioUrl2('');
                      localStorage.removeItem('productAudioUrl2');
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Photo 2</label>
                {localImage2 && (
                  <div className="mb-2">
                    <img src={localImage2} alt="Preview 2" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 2)}
                      className="hidden"
                    />
                    <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                      Importer
                    </div>
                  </label>
                  <button
                    onClick={() => {
                      setLocalImage2('');
                      localStorage.removeItem('productImage2');
                    }}
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Modifier un produit ({products.vinyls.length})</h3>
            <div className="space-y-3">
              {products.vinyls.map(product => (
                <div key={product.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{product.name}</h4>
                    <p className="text-sm text-gray-400">{product.genre} - {product.price}€ - Stock: {product.stock}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteProduct(product.id, 'vinyl');
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setEditingProduct(null)}
            ></div>
            
            {/* Popup */}
            <div className="bg-neutral-950 border border-yellow-500 rounded-xl p-4 max-w-4xl w-full max-h-[85vh] overflow-y-auto relative z-10">
              <h3 className="text-xl font-bold text-white mb-3">Modifier le produit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nom *</label>
                  <input
                    type="text"
                    value={editLocalName}
                    onChange={(e) => {
                      setEditLocalName(e.target.value);
                      localStorage.setItem('editProductName', e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                {editingProduct.category === 'vinyl' && (
                  <>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Label</label>
                      <input
                        type="text"
                        value={editLocalLabel}
                        onChange={(e) => {
                          setEditLocalLabel(e.target.value);
                          localStorage.setItem('editProductLabel', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Artiste(s)</label>
                      <input
                        type="text"
                        value={editLocalGenre}
                        onChange={(e) => {
                          setEditLocalGenre(e.target.value);
                          localStorage.setItem('editProductGenre', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Style</label>
                      <input
                        type="text"
                        value={editLocalStyle}
                        onChange={(e) => {
                          setEditLocalStyle(e.target.value);
                          localStorage.setItem('editProductStyle', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Format</label>
                      <input
                        type="text"
                        value={editLocalFormat}
                        onChange={(e) => {
                          setEditLocalFormat(e.target.value);
                          localStorage.setItem('editProductFormat', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Pays</label>
                      <input
                        type="text"
                        value={editLocalCountry}
                        onChange={(e) => {
                          setEditLocalCountry(e.target.value);
                          localStorage.setItem('editProductCountry', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Released</label>
                      <input
                        type="text"
                        value={editLocalReleased}
                        onChange={(e) => {
                          setEditLocalReleased(e.target.value);
                          localStorage.setItem('editProductReleased', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                  </>
                )}
                {editingProduct.category === 'skateboard' && (
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Type</label>
                    <input
                      type="text"
                      value={editingProduct.type || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, type: e.target.value})}
                      className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Prix (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editLocalPrice}
                    onChange={(e) => {
                      setEditLocalPrice(e.target.value);
                      localStorage.setItem('editProductPrice', e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Stock *</label>
                  <input
                    type="number"
                    value={editLocalStock}
                    onChange={(e) => {
                      setEditLocalStock(e.target.value);
                      localStorage.setItem('editProductStock', e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Bandeau Médias dans le formulaire Modifier */}
              <div className="mt-4">
                <h4 className="text-lg font-bold text-white mb-3">Médias</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Colonne 1 */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">URL Audio Face A</label>
                      <input
                        type="text"
                        value={editLocalAudioUrl}
                        onChange={(e) => {
                          setEditLocalAudioUrl(e.target.value);
                          localStorage.setItem('editProductAudioUrl', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            // Le champ input au-dessus permet déjà d'importer l'URL
                            console.log('ℹ️', 'Utilisez le champ ci-dessus pour coller votre URL YouTube');
                          }}
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-lg transition"
                        >
                          Importer
                        </button>
                        <button
                          onClick={() => {
                            setEditLocalAudioUrl('');
                            localStorage.removeItem('editProductAudioUrl');
                          }}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Photo 1</label>
                      {editLocalImage1 && (
                        <div className="mb-2">
                          <img src={editLocalImage1} alt="Preview 1" className="w-full h-32 object-cover rounded-lg" />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditLocalImage1(reader.result);
                                  localStorage.setItem('editProductImage1', reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                            Importer
                          </div>
                        </label>
                        <button
                          onClick={() => {
                            setEditLocalImage1('');
                            localStorage.removeItem('editProductImage1');
                          }}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Colonne 2 */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">URL Audio Face B</label>
                      <input
                        type="text"
                        value={editLocalAudioUrl2}
                        onChange={(e) => {
                          setEditLocalAudioUrl2(e.target.value);
                          localStorage.setItem('editProductAudioUrl2', e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            // Le champ input au-dessus permet déjà d'importer l'URL
                            console.log('ℹ️', 'Utilisez le champ ci-dessus pour coller votre URL YouTube');
                          }}
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-lg transition"
                        >
                          Importer
                        </button>
                        <button
                          onClick={() => {
                            setEditLocalAudioUrl2('');
                            localStorage.removeItem('editProductAudioUrl2');
                          }}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Photo 2</label>
                      {editLocalImage2 && (
                        <div className="mb-2">
                          <img src={editLocalImage2} alt="Preview 2" className="w-full h-32 object-cover rounded-lg" />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditLocalImage2(reader.result);
                                  localStorage.setItem('editProductImage2', reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                          <div className="w-full py-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-center rounded-lg transition">
                            Importer
                          </div>
                        </label>
                        <button
                          onClick={() => {
                            setEditLocalImage2('');
                            localStorage.removeItem('editProductImage2');
                          }}
                          className="flex-1 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-lg transition"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      const updatedProduct = {
                        ...editingProduct,
                        name: editLocalName,
                        label: editLocalLabel,
                        genre: editLocalGenre,
                        style: editLocalStyle,
                        format: editLocalFormat,
                        country: editLocalCountry,
                        released: editLocalReleased,
                        price: parseFloat(editLocalPrice),
                        stock: parseInt(editLocalStock),
                        audioUrl: editLocalAudioUrl,
                        audioUrl2: editLocalAudioUrl2,
                        image1: editLocalImage1,
                        image2: editLocalImage2
                      };
                      
                      if (editingProduct.category === 'vinyl') {
                        setProducts({
                          ...products,
                          vinyls: products.vinyls.map(p => p.id === editingProduct.id ? updatedProduct : p)
                        });
                      }
                      setEditingProduct(null);
                      console.log('ℹ️', 'Produit modifié avec succès !');
                    }}
                    className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition"
                  >
                    Enregistrer
                  </button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
        </div>
      </div>
    );
  };

  const ProductCard = ({ product, listView = false }) => {
    const [playing1, setPlaying1] = React.useState(false);
    const [playing2, setPlaying2] = React.useState(false);
    const player1Ref = React.useRef(null);
    const player2Ref = React.useRef(null);
    const [playersReady, setPlayersReady] = React.useState(false);

    // Si mode liste, retourner une vue horizontale
    if (listView) {
      return (
        <div className="bg-neutral-950 backdrop-blur-sm rounded-xl p-4 border border-yellow-500 flex gap-4">
          {/* Images miniatures */}
          <div className="flex gap-2">
            {product.image1 && (
              <img src={product.image1} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
            )}
            {product.image2 && (
              <img src={product.image2} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
            )}
          </div>
          
          {/* Infos produit */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{product.genre || product.type}</p>
            
            {/* Infos détaillées */}
            {product.label || product.style || product.format || product.country ? (
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs mb-3">
                {product.label && <span><span className="text-yellow-400 font-semibold">Label:</span> <span className="text-gray-300">{product.label}</span></span>}
                {product.style && <span><span className="text-yellow-400 font-semibold">Style:</span> <span className="text-gray-300">{product.style}</span></span>}
                {product.format && <span><span className="text-yellow-400 font-semibold">Format:</span> <span className="text-gray-300">{product.format}</span></span>}
                {product.country && <span><span className="text-yellow-400 font-semibold">Pays:</span> <span className="text-gray-300">{product.country}</span></span>}
              </div>
            ) : null}
            
            {/* Prix et Bouton */}
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-bold text-lg">{product.price}€</span>
              <div className="flex gap-0.5">
                {[...Array(50)].map((_, i) => {
                  const ledsLit = Math.ceil((product.stock / 500) * 50);
                  let colorClass;
                  if (i < ledsLit) {
                    if (product.stock >= 250) colorClass = 'bg-green-500';
                    else if (product.stock > 100) colorClass = 'bg-orange-500';
                    else colorClass = 'bg-red-500';
                  } else {
                    colorClass = 'bg-gray-700';
                  }
                  return <div key={i} className={`w-0.5 h-3 rounded-sm ${colorClass} transition-colors duration-300`} />;
                })}
              </div>
              <button
                onClick={() => {
                  setCart([...cart, product]);
                  console.log('ℹ️', 'Produit ajouté au panier !');
                }}
                className="ml-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Vue grille (normale)

    // Extraire l'ID YouTube d'une URL
    const getYouTubeId = (url) => {
      if (!url) return null;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    useEffect(() => {
      let retryCount = 0;
      const maxRetries = 20;
      
      const initPlayers = () => {
        if (window.YT && window.YT.Player) {
          console.log('✅ API YouTube disponible, initialisation des lecteurs');
          
          const videoId1 = getYouTubeId(product.audioUrl);
          const videoId2 = getYouTubeId(product.audioUrl2);
          
          if (videoId1 && !player1Ref.current) {
            console.log('🎵 Initialisation player 1 pour:', videoId1);
            player1Ref.current = new window.YT.Player(`player-${product.id}-1`, {
              videoId: videoId1,
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0
              },
              events: {
                onStateChange: (event) => {
                  if (event.data === window.YT.PlayerState.PLAYING) {
                    console.log('▶️ Player 1 - Lecture démarrée');
                    setPlaying1(true);
                    // Mettre en pause l'autre lecteur
                    if (player2Ref.current) {
                      player2Ref.current.pauseVideo();
                      setPlaying2(false);
                    }
                  } else if (event.data === window.YT.PlayerState.PAUSED) {
                    console.log('⏸️ Player 1 - Lecture en pause');
                    setPlaying1(false);
                  } else if (event.data === window.YT.PlayerState.ENDED) {
                    console.log('⏹️ Player 1 - Lecture terminée');
                    setPlaying1(false);
                  }
                }
              }
            });
          }
          
          if (videoId2 && !player2Ref.current) {
            console.log('🎵 Initialisation player 2 pour:', videoId2);
            player2Ref.current = new window.YT.Player(`player-${product.id}-2`, {
              videoId: videoId2,
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0
              },
              events: {
                onStateChange: (event) => {
                  if (event.data === window.YT.PlayerState.PLAYING) {
                    console.log('▶️ Player 2 - Lecture démarrée');
                    setPlaying2(true);
                    // Mettre en pause l'autre lecteur
                    if (player1Ref.current) {
                      player1Ref.current.pauseVideo();
                      setPlaying1(false);
                    }
                  } else if (event.data === window.YT.PlayerState.PAUSED) {
                    console.log('⏸️ Player 2 - Lecture en pause');
                    setPlaying2(false);
                  } else if (event.data === window.YT.PlayerState.ENDED) {
                    console.log('⏹️ Player 2 - Lecture terminée');
                    setPlaying2(false);
                  }
                }
              }
            });
          }
          
          setPlayersReady(true);
        } else {
          retryCount++;
          if (retryCount < maxRetries) {
            console.log(`⏳ API YouTube pas encore chargée, réessai ${retryCount}/${maxRetries} dans 500ms`);
            setTimeout(initPlayers, 500);
          } else {
            console.error('❌ Timeout: API YouTube non chargée après', maxRetries, 'tentatives');
          }
        }
      };

      // Attendre que l'API YouTube soit prête
      if (window.YT && window.YT.Player) {
        initPlayers();
      } else {
        window.onYouTubeIframeAPIReady = initPlayers;
      }
      
      return () => {
        if (player1Ref.current && player1Ref.current.destroy) {
          player1Ref.current.destroy();
        }
        if (player2Ref.current && player2Ref.current.destroy) {
          player2Ref.current.destroy();
        }
      };
    }, [product.audioUrl, product.audioUrl2, product.id]);

    const handleVignette1Click = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      console.log('Clic sur Face A');
      
      if (!player1Ref.current) {
        console.log('Player 1 non initialisé');
        return;
      }

      const playerState = player1Ref.current.getPlayerState();
      if (playerState === window.YT.PlayerState.PLAYING) {
        player1Ref.current.pauseVideo();
        console.log('Pause Face A');
      } else {
        player1Ref.current.playVideo();
        console.log('Lecture Face A');
      }
    };

    const handleVignette2Click = (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      console.log('Clic sur Face B');
      
      if (!player2Ref.current) {
        console.log('Player 2 non initialisé');
        return;
      }

      const playerState = player2Ref.current.getPlayerState();
      if (playerState === window.YT.PlayerState.PLAYING) {
        player2Ref.current.pauseVideo();
        console.log('Pause Face B');
      } else {
        player2Ref.current.playVideo();
        console.log('Lecture Face B');
      }
    };

    // Écouter la fin de la lecture

    return (
      <div className="bg-neutral-950 backdrop-blur-sm rounded-xl overflow-hidden hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
        <div className="relative bg-gray-800 flex items-center justify-center text-6xl overflow-hidden" style={{height: '100px'}}>
          {product.image1 ? (
            <>
              <img src={product.image1} alt={product.name} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex justify-end items-center gap-1 p-1">
                {product.image1 && product.audioUrl && (
                  <button 
                    onClick={handleVignette1Click}
                    className="relative w-20 h-20 rounded overflow-hidden border border-yellow-500 hover:border-yellow-400 shadow-lg transition group"
                  >
                    <img 
                      src={product.image1} 
                      alt="Face A" 
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition ${playing1 ? 'bg-black/70' : 'bg-black/50 opacity-0 group-hover:opacity-100'}`}>
                      <span className="text-white font-bold text-2xl mb-1">A</span>
                      {playing1 ? (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-4 bg-yellow-400"></div>
                            <div className="w-1.5 h-4 bg-yellow-400"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-8 border-l-yellow-400 border-y-6 border-y-transparent"></div>
                      )}
                    </div>
                  </button>
                )}
                {product.image2 && product.audioUrl2 && (
                  <button 
                    onClick={handleVignette2Click}
                    className="relative w-20 h-20 rounded overflow-hidden border border-yellow-500 hover:border-yellow-400 shadow-lg transition group"
                  >
                    <img 
                      src={product.image2} 
                      alt="Face B" 
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition ${playing2 ? 'bg-black/70' : 'bg-black/50 opacity-0 group-hover:opacity-100'}`}>
                      <span className="text-white font-bold text-2xl mb-1">B</span>
                      {playing2 ? (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-4 bg-yellow-400"></div>
                            <div className="w-1.5 h-4 bg-yellow-400"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-8 border-l-yellow-400 border-y-6 border-y-transparent"></div>
                      )}
                    </div>
                  </button>
                )}
              </div>
              {/* Lecteurs YouTube cachés */}
              {product.audioUrl && (
                <div id={`player-${product.id}-1`} className="hidden"></div>
              )}
              {product.audioUrl2 && (
                <div id={`player-${product.id}-2`} className="hidden"></div>
              )}
            </>
          ) : (
            <div className="text-6xl">{product.image}</div>
          )}
          <button 
            onClick={() => toggleFavorite(product.id)}
            className="absolute top-3 left-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition z-10"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
        
        <div className="p-2">
          {/* Ligne 1 : Genre + Stock/500 */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-400">{product.genre || product.type}</p>
            <span className="text-xs text-gray-400">Stock: {product.stock}/500</span>
          </div>
          
          {/* Ligne 2 : Nom + Jauge */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-white font-bold text-sm flex-1 truncate">{product.name}</h3>
            
            {/* Jauge de stock avec LED */}
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(50)].map((_, i) => {
                const ledsLit = Math.ceil((product.stock / 500) * 50);
                let colorClass;
                if (i < ledsLit) {
                  if (product.stock >= 250) colorClass = 'bg-green-500';
                  else if (product.stock > 100) colorClass = 'bg-orange-500';
                  else colorClass = 'bg-red-500';
                } else {
                  colorClass = 'bg-gray-700';
                }
                return (
                  <div
                    key={i}
                    className={`w-0.5 h-4 rounded-sm ${colorClass} transition-colors duration-300`}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Ligne d'infos supplémentaires */}
          <div className="text-xs text-gray-500 mb-2 flex justify-between items-center flex-wrap gap-x-1 gap-y-0.5">
            <div className="flex gap-1">
              <span className="text-yellow-400 font-semibold">Label:</span>
              <span className={!product.label ? 'text-gray-600' : ''}>{product.label || 'N/A'}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-yellow-400 font-semibold">Style:</span>
              <span className={!product.style ? 'text-gray-600' : ''}>{product.style || 'N/A'}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-yellow-400 font-semibold">Format:</span>
              <span className={!product.format ? 'text-gray-600' : ''}>{product.format || 'N/A'}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-yellow-400 font-semibold">Pays:</span>
              <span className={!product.country ? 'text-gray-600' : ''}>{product.country || 'N/A'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-yellow-400">
              {product.price.toFixed(2)}€
            </span>
            <button 
              onClick={() => product.stock > 0 && addToCart(product)}
              disabled={product.stock === 0}
              className={`px-3 py-1.5 font-bold text-sm rounded-lg transition ${
                product.stock === 0 
                  ? 'bg-red-600 text-white cursor-not-allowed' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}
            >
              {product.stock === 0 ? 'Sold out' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    );
  };


  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-bold mb-2" style={{ color: 'rgb(255, 186, 0)' }}>
          INFRABASS.ORG
        </h2>
        <p className="text-2xl text-gray-300 mb-12">
          Vinyls & Skateboards Shop
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {/* Bandeau Vinyls */}
        <div 
          className="group relative overflow-hidden rounded-2xl h-[280px] bg-gradient-to-br from-gray-900 to-black"
          style={{ width: '800px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Image de fond blanche (normale) */}
          <img 
            src={vinylBannerImage} 
            alt="Vinyls background" 
            className="vinyl-banner-white absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ mixBlendMode: 'screen', opacity: 1 }}
          />
          {/* Image de fond jaune (survol) */}
          <img 
            src={vinylBannerImageYellow} 
            alt="Vinyls background yellow" 
            className="vinyl-banner-yellow absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ mixBlendMode: 'screen', opacity: 0 }}
          />
          
          {/* Bouton central */}
          <div className="relative flex items-center justify-center h-full">
            <div 
              onClick={() => setCurrentPage('vinyl')}
              className="w-48 h-48 flex items-center justify-center cursor-pointer relative"
              onMouseEnter={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.vinyl-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.vinyl-btn-white');
                const bannerYellow = document.querySelector('.vinyl-banner-yellow');
                const bannerWhite = document.querySelector('.vinyl-banner-white');
                if (yellowBtn) { yellowBtn.style.opacity = '1'; yellowBtn.style.transform = 'scale(0.9)'; }
                if (whiteBtn) { whiteBtn.style.opacity = '0'; whiteBtn.style.transform = 'scale(0.9)'; }
                if (bannerYellow) bannerYellow.style.opacity = '1';
                if (bannerWhite) bannerWhite.style.opacity = '0';
              }}
              onMouseLeave={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.vinyl-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.vinyl-btn-white');
                const bannerYellow = document.querySelector('.vinyl-banner-yellow');
                const bannerWhite = document.querySelector('.vinyl-banner-white');
                if (yellowBtn) { yellowBtn.style.opacity = '0'; yellowBtn.style.transform = 'scale(1)'; }
                if (whiteBtn) { whiteBtn.style.opacity = '1'; whiteBtn.style.transform = 'scale(1)'; }
                if (bannerYellow) bannerYellow.style.opacity = '0';
                if (bannerWhite) bannerWhite.style.opacity = '1';
              }}
              onMouseDown={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.vinyl-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.vinyl-btn-white');
                if (yellowBtn) yellowBtn.style.transform = 'scale(1)';
                if (whiteBtn) whiteBtn.style.transform = 'scale(1)';
              }}
            >
              <img 
                src={vinylButtonImage} 
                alt="Vinyl button" 
                className="vinyl-btn-white w-full h-full object-contain transition-all duration-300 absolute inset-0"
                style={{ mixBlendMode: 'screen', opacity: 1 }}
              />
              <img 
                src={vinylButtonImageYellow} 
                alt="Vinyl button yellow" 
                className="vinyl-btn-yellow w-full h-full object-contain transition-all duration-300 absolute inset-0"
                style={{ mixBlendMode: 'screen', opacity: 0, transform: 'scale(1)' }}
              />
            </div>
          </div>
        </div>

        {/* Bandeau Skateboards */}
        <div 
          className="group relative overflow-hidden rounded-2xl h-[240px] bg-gradient-to-br from-gray-900 to-black"
          style={{ width: '800px', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Image de fond blanche (normale) */}
          <img 
            src={skateboardBannerImage} 
            alt="Skateboards background" 
            className="sk8-banner-white absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ mixBlendMode: 'screen', opacity: 1 }}
          />
          {/* Image de fond jaune (survol) */}
          <img 
            src={skateboardBannerImageYellow} 
            alt="Skateboards background yellow" 
            className="sk8-banner-yellow absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ mixBlendMode: 'screen', opacity: 0 }}
          />
          
          {/* Bouton central */}
          <div className="relative flex items-center justify-center h-full">
            <div 
              onClick={() => window.open('https://infrask8.webflow.io/', '_blank')}
              className="w-64 h-64 flex items-center justify-center cursor-pointer relative"
              onMouseEnter={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.sk8-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.sk8-btn-white');
                const bannerYellow = document.querySelector('.sk8-banner-yellow');
                const bannerWhite = document.querySelector('.sk8-banner-white');
                if (yellowBtn) { yellowBtn.style.opacity = '1'; yellowBtn.style.transform = 'scale(0.9)'; }
                if (whiteBtn) { whiteBtn.style.opacity = '0'; whiteBtn.style.transform = 'scale(0.9)'; }
                if (bannerYellow) bannerYellow.style.opacity = '1';
                if (bannerWhite) bannerWhite.style.opacity = '0';
              }}
              onMouseLeave={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.sk8-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.sk8-btn-white');
                const bannerYellow = document.querySelector('.sk8-banner-yellow');
                const bannerWhite = document.querySelector('.sk8-banner-white');
                if (yellowBtn) { yellowBtn.style.opacity = '0'; yellowBtn.style.transform = 'scale(1)'; }
                if (whiteBtn) { whiteBtn.style.opacity = '1'; whiteBtn.style.transform = 'scale(1)'; }
                if (bannerYellow) bannerYellow.style.opacity = '0';
                if (bannerWhite) bannerWhite.style.opacity = '1';
              }}
              onMouseDown={(e) => {
                const yellowBtn = e.currentTarget.querySelector('.sk8-btn-yellow');
                const whiteBtn = e.currentTarget.querySelector('.sk8-btn-white');
                if (yellowBtn) yellowBtn.style.transform = 'scale(1)';
                if (whiteBtn) whiteBtn.style.transform = 'scale(1)';
              }}
            >
              <img 
                src={skateboardButtonImage} 
                alt="Skateboard button" 
                className="sk8-btn-white w-full h-full object-contain transition-all duration-300 absolute inset-0"
                style={{ mixBlendMode: 'screen', opacity: 1 }}
              />
              <img 
                src={skateboardButtonImageYellow} 
                alt="Skateboard button yellow" 
                className="sk8-btn-yellow w-full h-full object-contain transition-all duration-300 absolute inset-0"
                style={{ mixBlendMode: 'screen', opacity: 0, transform: 'scale(1)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const VinylPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <svg width="80" height="80" viewBox="0 0 100 100">
              {/* Disque vinyl noir */}
              <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#6b7280" strokeWidth="2"/>
              {/* Sillons du vinyl */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="#333" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="34" fill="none" stroke="#333" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#333" strokeWidth="0.5"/>
              {/* Macaron central jaune Kodak */}
              <circle cx="50" cy="50" r="15" fill="#FCD34D"/>
              {/* Trou central */}
              <circle cx="50" cy="50" r="4" fill="#1a1a1a"/>
            </svg>
            <div>
              <h2 className="text-3xl font-bold text-white">Vinyls shop</h2>
              <p className="text-gray-400 text-sm">Collection de disques vinyls authentiques</p>
            </div>
          </div>
          
          {/* Boutons de switch vue */}
          <div className="flex gap-2 bg-neutral-950 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition ${
                viewMode === 'grid' 
                  ? 'bg-yellow-500 text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Vue mosaïque"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition ${
                viewMode === 'list' 
                  ? 'bg-yellow-500 text-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Vue liste"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {searchTerm && (
          <div className="bg-yellow-500/20 px-3 py-2 rounded-lg border border-yellow-500 inline-block">
            <p className="text-yellow-400 font-bold text-sm">
              {filteredVinyls.length} résultat{filteredVinyls.length > 1 ? 's' : ''} pour "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {filteredVinyls.length > 0 ? (
        viewMode === 'grid' ? (
          // Vue Mosaïque - 3 colonnes fixes
          <div className="grid grid-cols-3 gap-4">
            {filteredVinyls.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Vue Liste - Tableau type Excel
          <div className="bg-neutral-950 rounded-xl overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-yellow-500 text-black font-bold">
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-12">#</th>
                  <th className="py-3 px-3 text-left border-r border-yellow-600 min-w-[200px]">Nom</th>
                  <th className="py-3 px-3 text-left border-r border-yellow-600 min-w-[120px]">Genre</th>
                  <th className="py-3 px-3 text-left border-r border-yellow-600 min-w-[120px]">Label</th>
                  <th className="py-3 px-3 text-left border-r border-yellow-600 min-w-[100px]">Style</th>
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-20">Format</th>
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-16">Pays</th>
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-20">Sortie</th>
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-16">Stock</th>
                  <th className="py-3 px-3 text-center border-r border-yellow-600 w-20">Prix</th>
                  <th className="py-3 px-3 text-center w-16">Ajout</th>
                </tr>
              </thead>
              <tbody>
                {filteredVinyls.map((product, index) => (
                  <tr 
                    key={product.id}
                    className="border-b border-gray-800 hover:bg-gray-900 transition"
                  >
                    <td className="py-3 px-3 text-center text-gray-500 font-mono border-r border-gray-700">{index + 1}</td>
                    <td className="py-3 px-3 text-left text-white font-semibold border-r border-gray-700">{product.name}</td>
                    <td className="py-3 px-3 text-left text-gray-400 border-r border-gray-700">{product.genre || 'N/A'}</td>
                    <td className="py-3 px-3 text-left text-gray-400 border-r border-gray-700">{product.label || 'N/A'}</td>
                    <td className="py-3 px-3 text-left text-gray-400 border-r border-gray-700">{product.style || 'N/A'}</td>
                    <td className="py-3 px-3 text-center text-gray-400 border-r border-gray-700">{product.format || 'N/A'}</td>
                    <td className="py-3 px-3 text-center text-gray-400 border-r border-gray-700">{product.country || 'N/A'}</td>
                    <td className="py-3 px-3 text-center text-gray-400 border-r border-gray-700">{product.released || 'N/A'}</td>
                    <td className="py-3 px-3 text-center text-gray-400 border-r border-gray-700">{product.stock}</td>
                    <td className="py-3 px-3 text-center text-yellow-400 font-bold border-r border-gray-700">{product.price.toFixed(2)}€</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => {
                          if (product.stock > 0) {
                            addToCart(product);
                          }
                        }}
                        disabled={product.stock === 0}
                        className={`w-8 h-8 font-bold text-sm rounded-lg transition flex items-center justify-center mx-auto ${
                          product.stock === 0
                            ? 'bg-red-600 text-white cursor-not-allowed'
                            : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                        }`}
                      >
                        {product.stock === 0 ? '✕' : '+'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-2">
            {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Aucun vinyl trouvé'}
          </p>
          {searchTerm && (
            <p className="text-gray-500 text-sm">
              Essayez avec un autre terme de recherche (nom, genre, label, format, pays, etc.)
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black" style={{overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      <style>{`
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        html, body {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
      {currentPage !== 'home' && (
      <header className="bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <svg width="40" height="40" viewBox="0 0 100 100" className="flex-shrink-0">
                {/* Disque vinyl noir */}
                <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#6b7280" strokeWidth="2"/>
                {/* Sillons du vinyl */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="34" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke="#333" strokeWidth="0.5"/>
                {/* Macaron central jaune Kodak */}
                <circle cx="50" cy="50" r="15" fill="#FCD34D"/>
                {/* Trou central */}
                <circle cx="50" cy="50" r="4" fill="#1a1a1a"/>
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">INFRABASS</h1>
                <p className="text-xs text-gray-400">Vinyls & Skateboards Shop</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentPage === 'home' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
              >
                <Home className="w-4 h-4" />
                Accueil
              </button>
              <button 
                onClick={() => setCurrentPage('vinyl')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentPage === 'vinyl' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
              >
                <Music className="w-4 h-4" />
                Vinyls
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentPage === 'contact' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
              >
                Contact
              </button>
              <button 
                onClick={() => setCurrentPage('info')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentPage === 'info' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-white'}`}
              >
                Info
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('login')}
                className="text-white hover:text-yellow-400 transition"
                title="Admin"
              >
                <User className="w-6 h-6" />
              </button>
              <div 
                className="relative cursor-pointer"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="text-white w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-2">
              <button 
                onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg text-black font-bold"
              >
                <Home className="w-4 h-4" />
                Accueil
              </button>
              <button 
                onClick={() => { setCurrentPage('vinyl'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg text-black font-bold"
              >
                <Music className="w-4 h-4" />
                Vinyls
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg text-black font-bold"
              >
                Contact
              </button>
              <button 
                onClick={() => { setCurrentPage('info'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-lg text-black font-bold"
              >
                Info
              </button>
              
              {/* Barre de recherche dans le menu mobile */}
              {currentPage !== 'admin' && currentPage !== 'login' && (
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              )}
            </nav>
          )}

          {/* Barre de recherche centrée - visible sauf sur admin et login */}
          {currentPage !== 'admin' && currentPage !== 'login' && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          )}
        </div>
      </header>
      )}

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'vinyl' && <VinylPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'info' && <InfoPage />}
      {currentPage === 'login' && <AdminLoginPage />}
      {currentPage === 'admin' && isAdmin && <AdminPage />}

      {cartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setCartOpen(false)}
          ></div>
          
          <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-neutral-950 border-l border-yellow-500 shadow-2xl shadow-yellow-500/50 z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-2xl">Panier ({cartCount})</h3>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-yellow-900/20 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{item.image}</div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">{item.genre || item.type}</p>
                            <p className="text-yellow-400 font-bold">{item.price.toFixed(2)}€</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.qty - 1)}
                              className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="text-white font-bold w-8 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.qty + 1)}
                              className="w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-bold"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-yellow-500/30 pt-6">
                    <div className="flex justify-between text-white font-bold text-xl mb-6">
                      <span>Total</span>
                      <span className="text-yellow-400">{cartTotal.toFixed(2)}€</span>
                    </div>
                    
                    {showOrderConfirm ? (
                      <div className="bg-green-600/20 border border-green-500 rounded-lg p-4 text-center">
                        <p className="text-green-400 font-bold">✓ Commande confirmée !</p>
                        <p className="text-sm text-gray-300 mt-2">Merci pour votre achat</p>
                      </div>
                    ) : showPaymentForm ? (
                      <form onSubmit={handlePayment} className="space-y-4">
                        <h4 className="text-white font-bold text-lg mb-4">Informations de paiement</h4>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Nom complet *</label>
                          <input
                            type="text"
                            required
                            value={paymentData.name}
                            onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
                            className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                            placeholder="Jean Dupont"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            value={paymentData.email}
                            onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                            className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                            placeholder="jean@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Adresse *</label>
                          <input
                            type="text"
                            required
                            value={paymentData.address}
                            onChange={(e) => setPaymentData({...paymentData, address: e.target.value})}
                            className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                            placeholder="123 Rue de la Paix"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">Ville *</label>
                            <input
                              type="text"
                              required
                              value={paymentData.city}
                              onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                              placeholder="Paris"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">Code Postal *</label>
                            <input
                              type="text"
                              required
                              value={paymentData.postalCode}
                              onChange={(e) => setPaymentData({...paymentData, postalCode: e.target.value})}
                              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                              placeholder="75001"
                            />
                          </div>
                        </div>

                        <div className="border-t border-yellow-500/30 pt-4 mt-4">
                          <h5 className="text-white font-bold mb-4">Carte bancaire</h5>
                          
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">Numéro de carte *</label>
                            <input
                              type="text"
                              required
                              maxLength="19"
                              value={paymentData.cardNumber}
                              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                              className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="block text-gray-300 text-sm mb-2">Date expiration *</label>
                              <input
                                type="text"
                                required
                                maxLength="5"
                                value={paymentData.cardExpiry}
                                onChange={(e) => setPaymentData({...paymentData, cardExpiry: e.target.value})}
                                className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                placeholder="MM/AA"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-300 text-sm mb-2">CVV *</label>
                              <input
                                type="text"
                                required
                                maxLength="3"
                                value={paymentData.cardCVV}
                                onChange={(e) => setPaymentData({...paymentData, cardCVV: e.target.value})}
                                className="w-full px-4 py-2 bg-black/50 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button
                            type="button"
                            onClick={() => setShowPaymentForm(false)}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition"
                          >
                            Retour
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition"
                          >
                            Payer {cartTotal.toFixed(2)}€
                          </button>
                        </div>
                      </form>
                    ) : (
                      <button 
                        onClick={handleOrder}
                        className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition text-lg"
                      >
                        Valider la commande
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VinylSkateShop;