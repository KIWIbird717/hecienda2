// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'


export const UserPieChart = () => {
  const clientVesting = useSelector(state => state.client.clientVesting)
  const [data, setData] = useState([
    {
      "id": "stacking",
      "label": "stacking",
      "value": null,
      "color": "#80AB54"
    },
    {
      "id": "vesting",
      "label": "vesting",
      "value": null,
      "color": "#C0DF85"
    },
    {
      "id": "avaliable",
      "label": "avaliable",
      "value": null,
      "color": "#DB6C79"
    },
  ])


  useEffect(() => {
    setData([
      {
        "id": "stacking",
        "label": "stacking",
        "value": null,
        "color": "#80AB54"
      },
      {
        "id": "vesting",
        "label": "vesting",
        "value": clientVesting.origInvested,
        "color": "#C0DF85"
      },
      {
        "id": "avaliable",
        "label": "avaliable",
        "value": clientVesting.avaliable,
        "color": "#DB6C79"
      },
    ])
  }, [clientVesting])

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 15, right: 50, bottom: 15, left: 50 }}
      innerRadius={0.86}
      padAngle={1}
      cornerRadius={2}
      sortByValue={true}
      activeOuterRadiusOffset={9}
      colors={{ datum: 'data.color' }}
      borderWidth={0}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[]}
      legends={[]}
    />
  )
}