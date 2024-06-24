import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/filterSlice';

export default function OrderList() {
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery();
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filteredOrders = orders?.filter((order) =>
    filter === 'All' ? true : order.size === filter
  );

  const handleFilterChange = (size) => {
    dispatch(setFilter(size));
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {order.customer} ordered a {order.size} with {order.toppings.length > 0 ? `${order.toppings.length} toppings` : 'no toppings'}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter ${filter === size ? 'active' : ''}`}
            key={size}
            onClick={() => handleFilterChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
