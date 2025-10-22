import { motion } from 'framer-motion';
import { LOFI_STREAMS } from '../../utils/constants';

const StreamSelector = ({ selectedStream, onStreamChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        Select Lo-Fi Stream
      </label>
      <select
        value={selectedStream}
        onChange={(e) => onStreamChange(Number(e.target.value))}
        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-400 transition-colors cursor-pointer"
      >
        {LOFI_STREAMS.map((stream) => (
          <option key={stream.id} value={stream.id}>
            {stream.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StreamSelector;
