import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell} from 'recharts';

const EventGenre = ({ events }) => {
    /* Because of the 'events' that we are passing as props to EventGenre component with need to
    make sure that the code under will be asynchronous forcing this component to wait for the 'events'
    being updated from the Google Api Calendar. For this we use under the 'useState' and the 'useEffect'
    functions, where useEffect waits for '[events]' to be charged */
    const [data, setData] = useState([]);
    
    useEffect(() => { 
    const getData = () => {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    const data = genres.map((genre) => {
      const value = events.filter((event) =>
        event.summary.split(" ").includes(genre)
      ).length;
      return { name: genre, value: value };
    });
    return data;
    };
    //under the state is update asynchronous
    setData(() => getData()); }, [events]);
    
    const colors = [ '#1ba498', '#1b9895']
  
    return (
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={5}
            labelLine={false}
            outerRadius={80}
            fill="#1ba498"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  
}

export default EventGenre;