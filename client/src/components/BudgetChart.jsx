import { PieChart } from '@mui/x-charts/PieChart';

const BudgetChart = () => {
  return (
    <div style={{ height: '250px' }}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10 },
              { id: 1, value: 15 },
            ],
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 4,
            cornerRadius: 5,
            cx: "80%",
            cy: "50%",
          }
        ]}
      />
    </div>
  )
}

export default BudgetChart