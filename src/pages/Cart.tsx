import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { state, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {state.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {state.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 border border-[#2a3842] p-4 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-300">
                  {item.category} • {item.location}
                </p>
                <p className="text-sm">€{item.price ?? 0}</p>
              </div>

              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) =>
                  updateQty(item.id, Math.max(1, Number(e.target.value)))
                }
                className="w-16 rounded bg-[#1d2a35] border border-[#2a3842] px-2 py-1"
              />

              <button
                onClick={() => removeFromCart(item.id)}
                className="rounded bg-red-500/80 px-3 py-2 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-right space-y-2">
        <p className="text-lg">
          Subtotal: <strong>€{subtotal.toFixed(2)}</strong>
        </p>

        {/* Contact link */}
        <Link
          to="/contact" // istəsən: "/contact"
          className="inline-flex items-center justify-end gap-2 underline hover:opacity-80"
        >
          Need help? Contact us →
        </Link>
      </div>
    </div>
  );
}
