import React from 'react'

export default function BulletLessList(props) {
  const { list } = props;

  return (
    <ul className="bulletlessList">
      {list.map((item, index) => <li key={item.id || index}>{item.name || item}</li>)}
    </ul >
  )
}
