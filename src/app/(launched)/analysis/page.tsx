'use client';
import { Col, DatePicker, Form, Row, Statistic } from 'antd';

export default function hello() {
  return (
    <>
      <Form>
        <Form.Item name="month" label="当前月份">
          <DatePicker picker="month" />
        </Form.Item>
      </Form>
      <Row gutter={[16, 64]}>
        <Col span={8}>
          <Statistic title="本月总收入" value={'114514元'} />
        </Col>
        <Col span={8}>
          <Statistic title="本月收入占比" value={'100%'} />
        </Col>
        <Col span={8}>
          <Statistic title="本月支出占比" value={'100%'} />
          {/* <Button style={{ marginTop: 16 }} type="primary">
            Recharge
          </Button> */}
        </Col>
        {/* <Col span={8}>
          <Statistic title="Active Users" value={112893} loading />
        </Col> */}

        <Col span={8}>
          <Statistic title="上月总收入" value={'114514元'} />
        </Col>
        <Col span={8}>
          <Statistic title="上月收入占比" value={'100%'} />
        </Col>
        <Col span={8}>
          <Statistic title="上月支出占比" value={'100%'} />
          {/* <Button style={{ marginTop: 16 }} type="primary">
            Recharge
          </Button> */}
        </Col>
        {/* <Col span={8}>
          <Statistic title="Active Users" value={112893} loading />
        </Col> */}
      </Row>
    </>
  );
}
