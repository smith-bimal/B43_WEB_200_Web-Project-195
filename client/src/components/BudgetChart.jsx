import { PieChart } from '@mui/x-charts/PieChart';

const BudgetChart = ({ totalBudget = 0, totalSpent = 0 }) => {
  const remaining = Math.max(totalBudget - totalSpent, 0);
  const data = totalBudget === 0 ? [
    { id: 0, value: 1, label: 'Set budget', color: '#e5e5e5' }
  ] : [
    { id: 0, value: totalSpent, label: 'Spent', color: '#02B2AF' },
    { id: 1, value: remaining, label: 'Remaining', color: '#2E96FF' },
  ];
  
  return (
    <div style={{ height: '250px' }}>
      <PieChart
        series={[
          {
            data,
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
  );
};

export default BudgetChart;