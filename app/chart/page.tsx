'use client';
import { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5wc from '@amcharts/amcharts5/wc';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { getAllMessagesAction } from './actions';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const WordCloudChart = () => {
  const [messages, setMessages] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
     
        const response = await getAllMessagesAction();
        if (response.error) {
          toast.error(response.error.message);
        } else {
          setMessages(response.data!);
        }
     
    };

    fetchMessages();
    setLoading(false)
  }, []);

  useEffect(() => {
    if (messages &&!loading) {
      const root = am5.Root.new("chartdiv");

      root.setThemes([
        am5themes_Animated.default.new(root)
      ]);

      const zoomableContainer = root.container.children.push(
        am5.ZoomableContainer.new(root, {
          width: am5.p100,
          height: am5.p100,
          wheelable: true,
          pinchZoom: true
        })
      );

      const zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
        target: zoomableContainer
      }));

      const series = zoomableContainer.contents.children.push(am5wc.WordCloud.new(root, {
        maxCount: 100,
        minWordLength: 2,
        maxFontSize: am5.percent(35),
        text: messages,
      }));

      series.labels.template.setAll({
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        fontFamily: "Courier New"
      });
setLoading(false)
      return () => {
        root.dispose();
      };
    }
  }, [messages, loading]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md pt-[90px]">
      <h1 className="text-black text-center mb-4 text-lg font-semibold">
        Word Cloud of Most Words You Have Used
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
      )}
    </div>
  );
};

export default WordCloudChart;
