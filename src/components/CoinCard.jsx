import { Link } from 'react-router';

const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className='coin-card'>
        <button
          className='star-btn'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(coin.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <div className='coin-header'>
          <img src={coin.image} alt={coin.name} className='coin-image' />
          <div>
            <h2>{coin.name}</h2>
            <p className='symbol'>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: ${coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)} %
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CoinCard;
