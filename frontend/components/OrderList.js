import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/filterSlice';

export default function OrderList() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const { data: orders, isLoading: gettingOrders, isFetching: refreshingOrders } = useGetOrdersQuery();

  const handleFilterClick = (size) => {
    dispatch(setFilter(size));
  };

  if (gettingOrders || refreshingOrders) {
    return <div>Loading...</div>;
  }

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map(order => (
            <li key={order.id}>
              <div>
                {order.customer} ordered a {order.size} with {order.toppings > 0 ? `${order.toppings} toppings` : 'no toppings'}
              </div>
            </li>
          ))
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${filter === size ? ' active' : ''}`;
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => handleFilterClick(size)}
              >
                {size}
              </button>
            );
          })
        }
      </div>
    </div>
  );
}
