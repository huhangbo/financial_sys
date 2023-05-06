'use client';
import { Button, Col, Row, Statistic } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Row gutter={40}>
    <Col span={6}>
      <Statistic title="月度帐单" value={'5月'} />
    </Col>
    <Col span={6}>
      <Statistic title="收入(元)" value={1231231} precision={2} />
      <Button style={{ marginTop: 16 }} type="primary">
        Recharge
      </Button>
    </Col>
    <Col span={6}>
      <Statistic title="支出(元)" value={112893} precision={2} />
      <Button style={{ marginTop: 16 }} type="primary">
        Recharge
      </Button>
    </Col>
    <Col span={6}>
      <Statistic title="结余(元)" value={112893} precision={2} />
      <Button style={{ marginTop: 16 }} type="primary">
        Recharge
      </Button>
    </Col>
  </Row>
);

export default App;
