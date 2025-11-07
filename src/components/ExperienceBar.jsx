export const ExperienceBar = ({ skill, level, maxLevel = 100, color = '#4CAF50' }) => {
  const percentage = (level / maxLevel) * 100;

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '6px',
        fontSize: '12px',
        fontWeight: '500',
        color: '#e0e0e0'
      }}>
        <span>{skill}</span>
        <span>{level}/{maxLevel}</span>
      </div>
      <div style={{
        width: '100%',
        height: '18px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '9px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '9px',
          transition: 'width 0.8s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          boxShadow: `0 0 12px ${color}80`
        }}>
          {percentage >= 20 && `${Math.round(percentage)}%`}
        </div>
      </div>
    </div>
  );
};