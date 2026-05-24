import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3a',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#e94560',
  },

  headerSub: {
    fontSize: 13,
    color: '#555',
  },

  form: {
    backgroundColor: '#13132a',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3a',
  },

  input: {
    backgroundColor: '#1a1a35',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },

  timeBtn: {
    backgroundColor: '#1a1a35',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e94560',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeBtnText: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '700',
  },

  timeBtnHint: {
    color: '#555',
    fontSize: 11,
  },

  addBtn: {
    backgroundColor: '#e94560',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },

  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#13132a',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  cardPast: {
    opacity: 0.5,
  },

  cardLeft: {
    width: 4,
    backgroundColor: '#e94560',
    alignSelf: 'stretch',
  },

  cardBody: {
    flex: 1,
    padding: 14,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },

  cardDesc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
  },

  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },

  cardTime: {
    color: '#7ecff5',
    fontSize: 12,
  },

  badge: {
    backgroundColor: '#1a3a1a',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgeOff: {
    backgroundColor: '#2a2a2a',
  },

  badgeText: {
    color: '#4caf50',
    fontSize: 11,
  },

  delBtn: {
    width: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e0a10',
  },

  delBtnText: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: '700',
  },

  empty: {
    paddingTop: 60,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },

  emptyText: {
    color: '#444',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyHint: {
    color: '#333',
    fontSize: 13,
    marginTop: 4,
  },
});