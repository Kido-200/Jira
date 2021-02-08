import React, { useEffect, useState } from 'react'

const SearchPanel = ({param,setParam,users,setUsers}) => {

  return (
  <form>
    <div>
      <input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name:evt.target.value
      })} />
    </div>
    <select value={param.personId} onChange={evt => setParam({
      ...param,
      personId:evt.target.value
    })} >
      <option value={""}>负责人</option>
      {
        users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
      }
    </select>
  </form>
  )
}
export default SearchPanel